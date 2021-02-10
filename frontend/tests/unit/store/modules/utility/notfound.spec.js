import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import notfound from '@/store/modules/utility/notfound.js'
import cloneDeep from 'lodash/cloneDeep'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(notfound))
})

