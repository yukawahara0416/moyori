import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import tab from '@/store/modules/utility/tab.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(tab))
})

const name = 'test'

describe('getters', () => {
  it('signTab', () => {
    store.replaceState({ signTab: name })
    expect(store.getters['signTab']).toBe(name)
  })

  it('profileTab', () => {
    store.replaceState({ profileTab: name })
    expect(store.getters['profileTab']).toBe(name)
  })
})

describe('mutations', () => {
  it('changeSignTab', () => {
    store.commit('changeSignTab', name)
    expect(store.state.signTab).toBe(name)
  })

  it('changeProfileTab', () => {
    store.commit('changeProfileTab', name)
    expect(store.state.profileTab).toBe(name)
  })
})
