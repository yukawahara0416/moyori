import { axiosBase } from '@/plugins/axios.js'

export default {
  namespaced: true,
  state: {
    spotFormData: {
      address: '',
      name: '',
      image: '',
      place_id: '',
      lat: '',
      lng: '',
      url: ''
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
        image: '',
        place_id: '',
        lat: '',
        lng: '',
        url: ''
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
      axiosBase
        .post('/api/v1/spots', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          response.data.marker.position = new google.maps.LatLng(
            response.data.marker.position.lat,
            response.data.marker.position.lng
          )
          context.dispatch('pushSpot', response.data)
          context.dispatch('dialogOff', null, { root: true })
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

    editSpot(context, spot) {
      axiosBase
        .patch('/api/v1/spots/' + spot.data.id, spot.data, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          response.data.marker.position = new google.maps.LatLng(
            response.data.marker.position.lat,
            response.data.marker.position.lng
          )
          context.dispatch('updateSpot', {
            spot: spot,
            data: response.data.data
          })
          context.dispatch('dialogOff', null, { root: true })
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
