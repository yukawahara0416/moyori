import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { sync } from 'vuex-router-sync'
import vuetify from '@/plugins/vuetify'
import vee from '@/plugins/vee-validate'
import 'vuetify/dist/vuetify.min.css'
import '@/plugins/maps.js'

Vue.config.productionTip = process.env.NODE_ENV === 'production' ? false : true

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  vee,
  render: h => h(App)
})
