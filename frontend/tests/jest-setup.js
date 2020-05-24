import Vue from 'vue'
import Vuetify from 'vuetify'
import { config } from '@vue/test-utils'

Vue.use(Vuetify)
Vue.config.productionTip = process.env.NODE_ENV === 'production' ? false : true
// Vue.config.silent = true

config.stubs['GmapMap'] = '<div />'
config.stubs['.v-btn'] = '<button />'
