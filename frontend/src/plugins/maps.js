import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Spot } from '@/class/Spot.js'
import { axiosBase } from '@/plugins/axios.js'
import merge from 'lodash/merge'
import queryString from 'query-string'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAP_API_KEY,
    libraries: ['places', 'geometry'],
    region: 'JP',
    language: 'ja'
  }
})

// 現在地を取得します
export function geolocate() {
  return new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(
      result => {
        resolve({
          lat: result.coords.latitude,
          lng: result.coords.longitude
        })
      },
      error => {
        if (error.code == 3) {
          reject('タイムアウトしました')
        } else {
          reject('現在地の取得時にエラーが発生しました')
        }
      },
      options
    )
  })
}

// 緯度経度から住所を検索して返すことで
// ユーザのスポット作成作業をサポートします
export function geocodeGenerate(event) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder()
    const latLng = {
      lat: parseFloat(event.latLng.lat().toFixed(6)),
      lng: parseFloat(event.latLng.lng().toFixed(6))
    }
    geocoder.geocode({ latLng: latLng }, function(results, status) {
      if (status === 'OK') {
        const address =
          status === 'OK'
            ? results[0].formatted_address.replace(/^日本、/, '')
            : ''
        const geocodeData = {
          address: address,
          lat: latLng.lat,
          lng: latLng.lng
        }
        resolve(geocodeData)
      } else {
        reject('住所検索中にエラーが発生しました')
      }
    })
  })
}

// ユーザのスポット作成時にplace_idを自動生成します
export function placeIdGenerate(userId) {
  const l = 8
  const c = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const cl = c.length
  let r = ''
  for (var i = 0; i < l; i++) {
    r += c[Math.floor(Math.random() * cl)]
  }
  const placeIdData = { place_id: userId + '_' + r }
  return placeIdData
}

// スポットを登録します
export function postSpot(params, headers) {
  return axiosBase
    .post('/api/v1/spots', params, { headers })
    .then(response => {
      return new Spot(response.data)
    })
    .catch(() => {
      throw new Error('スポットの登録に失敗しました')
    })
}

/**************
 * GoogleMapsAPI 周辺検索機能
 **************/

// 周辺検索結果をSpotインスタンス化して、結合して返します
export async function nearbySearch(center, radius, map, request) {
  // MoYoRiのデータベースを検索します
  const result1 = await nearbySearchFromDatabase(center, radius)
  let resultFromDatabase = result1.data.map(spot => {
    return new Spot(spot)
  })
  resultFromDatabase = resultFromDatabase.filter(spot => {
    return !spot.isGmapSpot()
  })

  // GoogleMapsAPIを検索します
  const result2 = await nearbySearchFromGmap(map, request)
  const resultFromGmap = await Promise.all(
    result2.map(async spot => {
      const formatted = await formatGmapSpot(spot)
      const collated = await collateGmapSpot(formatted)
      return collated
    })
  )

  return [...resultFromDatabase, ...resultFromGmap]
}

// MoYoRiのデータベースで周辺検索します
function nearbySearchFromDatabase(center, radius) {
  radius /= 1000
  return axiosBase.get('/api/v1/spots/nearby', {
    params: { lat: center.lat, lng: center.lng, distance: radius }
  })
}

// GoogleMapsAPIで周辺検索します
function nearbySearchFromGmap(map, request) {
  return new Promise((resolve, reject) => {
    const placeService = new google.maps.places.PlacesService(map)
    placeService.nearbySearch(request, (results, status) => {
      if (status === 'OK' || status === 'ZERO_RESULTS') {
        resolve(results)
      } else {
        reject('GoogleMapsへの問い合わせ中にエラーが発生しました')
      }
    })
  })
}

// GoogleMapsAPI形式のデータ構造をSpotインスタンス化します
function formatGmapSpot(spot) {
  const photo_url =
    'photos' in spot
      ? spot.photos[0].getUrl({ maxWidth: 320 })
      : require('@/assets/noimage.png')

  const photo_reference =
    'photos' in spot
      ? photo_url
          .replace(
            'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1s',
            ''
          )
          .split('&')[0]
      : null

  const format = {
    data: {
      place_id: spot.place_id || null,
      name: spot.name || null,
      address: spot.vicinity || null,
      position: {
        lat: spot.geometry.location.lat() || null,
        lng: spot.geometry.location.lng() || null
      },
      photo_reference: photo_reference,
      photo_url: photo_url
    }
  }

  return new Spot(format)
}

// GoogleMapsが保有するスポットで
// ユーザの投票・コメント投稿があればデータに追加します
function collateGmapSpot(spot) {
  return new Promise((resolve, reject) => {
    const query = queryString.stringify({ place_id: spot.data.place_id })
    axiosBase
      .get('/api/v1/spots/collate?' + query)
      .then(response => {
        if (response.status === 200) {
          const collated = merge(spot, response.data[0])
          resolve(collated)
        }
        resolve(spot)
      })
      .catch(() => {
        reject('GoogleMapsへの問い合せ中にエラーが発生しました')
      })
  })
}

/**************
 * GoogleMapsAPI 詳細検索機能
 **************/

// GoogleMapsが保有するスポットの詳細情報を返します
export function placeDetail({ map, place_id }) {
  return new Promise((resolve, reject) => {
    const placeService = new google.maps.places.PlacesService(map)
    const request = {
      placeId: place_id,
      fields: [
        'formatted_address',
        'formatted_phone_number',
        'opening_hours',
        'photos',
        'reviews',
        'website'
      ]
    }
    placeService.getDetails(request, (result, status) => {
      if (status == 'OK' || status == 'ZERO_RESULTS') {
        if (result.opening_hours) {
          delete result.opening_hours.open_now
          delete result.opening_hours.isOpen
          delete result.opening_hours.periods
        }

        const restore = {
          data: {
            address: result.formatted_address,
            phone: result.formatted_phone_number,
            opening_hours: result.opening_hours,
            photos: result.photos,
            reviews: result.reviews,
            url: result.website
          }
        }

        resolve(restore)
      } else {
        reject('スポット情報の取得に失敗しました')
      }
    })
  })
}
