import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import vote from '@/store/modules/spot/vote.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import { cloneDeep } from 'lodash'

const axiosMock = new MockAdapter(axiosBase)

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(vote))
})
