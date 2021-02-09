import { Spot } from '@/class/Spot.js'

export default {
  state: {
    spotForm: {
      place_id: '',
      name: '',
      address: '',
      photo_reference: null,
      picture: null,
      phone: null,
      lat: '',
      lng: '',
      url: null
    }
  },

  getters: {
    spotForm(state) {
      return state.spotForm
    },

    formData(state) {
      const formData = new FormData()
      const keys = Object.keys(state.spotForm)

      for (let i = 0; i < keys.length; i++) {
        if (state.spotForm[keys[i]] !== null)
          formData.append(`spot[${keys[i]}]`, state.spotForm[keys[i]])
      }

      return formData
    }
  },

  mutations: {
    setSpotForm(state, payload) {
      if (payload instanceof Spot) {
        const obj = {
          place_id: payload.data.place_id,
          address: payload.data.address,
          name: payload.data.name,
          photo_reference: payload.data.photo_reference,
          picture: payload.data.picture,
          phone: payload.data.phone,
          lat: payload.data.position.lat,
          lng: payload.data.position.lng,
          url: payload.data.url
        }
        Object.assign(state.spotForm, obj)
        return
      }

      Object.assign(state.spotForm, payload)
    },

    clearSpotForm(state) {
      state.spotForm = {
        place_id: '',
        address: '',
        name: '',
        photo_reference: null,
        picture: null,
        phone: null,
        lat: '',
        lng: '',
        url: null
      }
    }
  }
}
