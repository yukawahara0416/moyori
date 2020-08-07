import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import dialog from '@/store/modules/utility/dialog.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(dialog))
})

describe('getters', () => {
  it('dialogSign', () => {
    store.replaceState({ dialogSign: true })
    expect(store.getters['dialogSign']).toBe(true)
  })
  it('dialogProfileEdit', () => {
    store.replaceState({ dialogProfileEdit: true })
    expect(store.getters['dialogProfileEdit']).toBe(true)
  })
  it('dialogProfileDelete', () => {
    store.replaceState({ dialogProfileDelete: true })
    expect(store.getters['dialogProfileDelete']).toBe(true)
  })
  it('dialogSpotCreate', () => {
    store.replaceState({ dialogSpotCreate: true })
    expect(store.getters['dialogSpotCreate']).toBe(true)
  })
})

describe('mutations', () => {
  it('dialogOn', () => {
    const target = 'dialogSign'
    store.commit('dialogOn', target)
    expect(store.state.dialogSign).toBe(true)
  })

  it('dialogOff', () => {
    store.replaceState({ dialogSign: true })
    store.commit('dialogOff')
    expect(store.state.dialogSign).toBe(false)
  })
})

describe('actions', () => {
  it('dialogOn', () => {
    const target = 'dialogSign'
    store.dispatch('dialogOn', target).then(() => {
      expect(store.state.dialogSign).toBe(true)
    })
  })
  it('dialogOff', () => {
    store.replaceState({ dialogSign: true })
    store.dispatch('dialogOff').then(() => {
      expect(store.state.dialogSign).toBe(false)
    })
  })
})
