import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import form from '@/store/modules/spot/form.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(form))
})

const init = {
  place_id: '',
  name: '',
  address: '',
  image: null,
  picture: null,
  phone: null,
  lat: '',
  lng: '',
  url: null
}

const data = { test: 'test' }
