import { Spot } from '@/class/Spot.js'

export default {
  state: {
    form: {
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
    form(state) {
      return state.form
    },

    formData(state) {
      const formData = new FormData()
      const keys = Object.keys(state.form)

      for (let i = 0; i < keys.length; i++) {
        if (state.form[keys[i]] !== null)
          formData.append(`spot[${keys[i]}]`, state.form[keys[i]])
      }

      return formData
    }
  },

  mutations: {
    setForm(state, payload) {
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
        Object.assign(state.form, obj)
        return
      }

      Object.assign(state.form, payload)
    },

    clearForm(state) {
      state.form = {
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
