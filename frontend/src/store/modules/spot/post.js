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

    postSpot(context, form_data) {
      axiosBase
        .post('/api/v1/spots', form_data, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          response.data.marker.position = new google.maps.LatLng(
            response.data.marker.position.lat,
            response.data.marker.position.lng
          )
          context.commit('spot/unshiftSpotsStore', response.data, {
            root: true
          })
          context.dispatch('spot/spotlight', response.data, { root: true })
          context.dispatch('dialogOff', 'dialogSpotCreate', { root: true })
          context.commit('clearSpotFormData')
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

    updateSpot(context, { spot, form_data }) {
      axiosBase
        .patch('/api/v1/spots/' + spot.data.id, form_data, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          response.data.marker.position = new google.maps.LatLng(
            response.data.marker.position.lat,
            response.data.marker.position.lng
          )
          context.commit(
            'spot/updateDataSpotsStore',
            { spot: spot, data: response.data.marker, prop: 'marker' },
            { root: true }
          )
          context.commit(
            'spot/updateDataSpotsStore',
            { spot: spot, data: response.data.data, prop: 'data' },
            { root: true }
          )
          context.dispatch('dialogOff', 'dialogSpotEdit', { root: true })
          context.commit('clearSpotFormData')
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
