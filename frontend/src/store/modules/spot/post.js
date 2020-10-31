import { axiosBase } from '@/plugins/axios.js'

export default {
  namespaced: true,
  state: {
    spotFormData: {
      address: '',
      name: '',
      picture: null,
      place_id: '',
      phone: null,
      lat: '',
      lng: '',
      url: null
    }
  },

  getters: {
    spotFormData(state) {
      return state.spotFormData
    }
  },

  mutations: {
    assignSpotFormData(state, payload) {
      Object.assign(state.spotFormData, payload)
    },

    clearSpotFormData(state) {
      state.spotFormData = {
        address: '',
        name: '',
        picture: null,
        place_id: '',
        phone: null,
        lat: '',
        lng: '',
        url: null
      }
    }
  },

  actions: {
    addSpots(context, spot) {
      context.commit('spot/addSpots', spot, { root: true })
    },

    pushSpot(context, spot) {
      context.commit('spot/pushSpot', spot, { root: true })
    },

    updateSpot(context, { spot, data }) {
      context.commit(
        'spot/updateData',
        { spot: spot, data: data },
        { root: true }
      )
    },

    clearSpotFormData(context) {
      context.commit('clearSpotFormData')
    },

    nearbySearch(context, center) {
      return new Promise(resolve => {
        const params = { lat: center.lat, lng: center.lng }
        axiosBase
          .get('/api/v1/spots/nearby', {
            params: params
          })
          .then(response => {
            resolve(response.data)
          })
      })
    },

    postSpot(context, params) {
      const formData = new FormData()
      formData.append('spot[address]', params.address)
      formData.append('spot[name]', params.name)
      if (params.picture !== null)
        formData.append('spot[picture]', params.picture)
      formData.append('spot[place_id]', params.place_id)
      if (params.phone !== null) formData.append('spot[phone]', params.phone)
      formData.append('spot[lat]', params.lat)
      formData.append('spot[lng]', params.lng)
      if (params.url !== null) formData.append('spot[url]', params.url)
      axiosBase
        .post('/api/v1/spots', formData, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          response.data.marker.position = new google.maps.LatLng(
            response.data.marker.position.lat,
            response.data.marker.position.lng
          )
          context.dispatch('pushSpot', response.data)
          context.dispatch('dialogOff', 'dialogSpotCreate', { root: true })
          context.dispatch('clearSpotFormData')
          context.dispatch(
            'pushSnackbar',
            {
              message: 'スポットを登録しました。ありがとうございます！',
              color: 'success'
            },
            { root: true }
          )
        })
        .catch(() => {
          context.dispatch(
            'pushSnackbar',
            {
              message: '予期しないエラーが発生しました',
              color: 'error'
            },
            { root: true }
          )
        })
    },

    editSpot(context, { spot, picture }) {
      const formData = new FormData()
      formData.append('spot[address]', spot.data.address)
      formData.append('spot[name]', spot.data.name)
      formData.append('spot[place_id]', spot.data.place_id)
      formData.append('spot[lat]', spot.data.lat)
      formData.append('spot[lng]', spot.data.lng)
      if (spot.data.phone !== null)
        formData.append('spot[phone]', spot.data.phone)
      if (spot.data.url !== null) formData.append('spot[url]', spot.data.url)
      if (picture !== null) formData.append('spot[picture]', picture)
      axiosBase
        .patch('/api/v1/spots/' + spot.data.id, formData, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          response.data.marker.position = new google.maps.LatLng(
            response.data.marker.position.lat,
            response.data.marker.position.lng
          )
          context.dispatch('updateSpot', {
            spot: spot,
            data: response.data
          })
          context.dispatch('dialogOff', 'dialogSpotEdit', { root: true })
          context.dispatch('clearSpotFormData')
          context.dispatch(
            'pushSnackbar',
            {
              message: 'スポットの情報を更新しました。ありがとうございます！',
              color: 'success'
            },
            { root: true }
          )
        })
        .catch(() => {
          context.dispatch(
            'pushSnackbar',
            {
              message: '予期しないエラーが発生しました',
              color: 'error'
            },
            { root: true }
          )
        })
    },

    cancelPostSpot(context) {
      context.commit('clearSpotFormData')
    },

    geocode(context, event) {
      const geocoder = new google.maps.Geocoder()
      var latLng = {
        lat: parseFloat(event.latLng.lat().toFixed(6)),
        lng: parseFloat(event.latLng.lng().toFixed(6))
      }
      geocoder.geocode({ latLng: latLng }, function(results, status) {
        if (status === 'OK') {
          var address =
            status === 'OK'
              ? results[0].formatted_address.replace(/^日本、/, '')
              : ''
          var geocodeData = {
            address: address,
            lat: latLng.lat,
            lng: latLng.lng
          }
          context.commit('assignSpotFormData', geocodeData)
        }
      })
    },

    placeIdGenerate(context, userId) {
      var l = 8
      var c = 'abcdefghijklmnopqrstuvwxyz0123456789'
      var cl = c.length
      var r = ''
      for (var i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)]
      }
      var placeIdData = { place_id: userId + '_' + r }
      context.commit('assignSpotFormData', placeIdData)
    }
  }
}
