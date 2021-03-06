import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import loading from '@/store/modules/utility/loading.js'
import cloneDeep from 'lodash/cloneDeep'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(loading))
})

describe('getters', () => {
  it('loading', () => {
    store.replaceState({ loading: true })
    expect(store.getters['loading']).toBeTruthy()
  })
})

describe('mutations', () => {
  it('loadingOn', () => {
    store.commit('loadingOn')
    expect(store.state.loading).toBeTruthy()
  })

  it('loadingOff', () => {
    store.replaceState({ loading: true })
    store.commit('loadingOff')
    expect(store.state.loading).toBeFalsy()
  })
})
