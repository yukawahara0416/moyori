import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.config.productionTip = process.env.NODE_ENV === 'production' ? false : true
// Vue.config.silent = true

// TypeError: Cannot read property 'getCurrentPosition' of undefined
const mockGeolocation = {
  getCurrentPosition: jest.fn()
}
global.navigator.geolocation = mockGeolocation
