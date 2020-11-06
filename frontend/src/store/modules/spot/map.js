import { axiosBase } from '@/plugins/axios.js'
import queryString from 'query-string'

export default {
  namespaced: true,
  actions: {
    nearbySearch(context, { map, request }) {
      return new Promise(resolve => {
        const placeService = new google.maps.places.PlacesService(map)
        placeService.nearbySearch(request, (results, status) => {
          if (status == 'OK' || status == 'ZERO_RESULTS') {
            resolve(results)
          } else {
            context.dispatch(
              'pushSnackbar',
              {
                message: '予期しないエラーが発生しました',
                color: 'error'
              },
              { root: true }
            )
          }
        })
      })
    },

    placeDetail(context, { map, spot }) {
      return new Promise(resolve => {
        const placeService = new google.maps.places.PlacesService(map)
        const request = {
          placeId: spot.marker.place_id,
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
            }
            resolve(result)
          }
        })
      })
    },

    saveSpot(context, spot) {
      return new Promise(resolve => {
        const params = { spot: { place_id: spot.marker.place_id } }
        axiosBase
          .post('/api/v1/spots/save', params, {
            headers: context.rootState.auth.headers
          })
          .then(response => {
            context.commit(
              'spot/updateDataSpotsStore',
              {
                spot: spot,
                data: response.data.data,
                prop: 'data'
              },
              { root: true }
            )
            resolve(response.data)
          })
      })
    },

    collateSpot(context, res) {
      return new Promise(resolve => {
        const query = queryString.stringify({ place_id: res.marker.place_id })
        axiosBase.get('/api/v1/spots/collate?' + query).then(response => {
          if (response.data !== null) {
            var assigned = Object.assign(res, response.data)
            resolve(assigned)
          }
          resolve(res)
        })
      })
    },

    geolocate(context) {
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
              context.dispatch(
                'pushSnackbar',
                {
                  message: 'タイムアウトしました',
                  color: 'error'
                },
                { root: true }
              )
            } else {
              context.dispatch(
                'pushSnackbar',
                {
                  message: '現在地の取得時にエラーが発生しました',
                  color: 'error'
                },
                { root: true }
              )
            }
            reject(error)
          },
          options
        )
      })
    }
  }
}
