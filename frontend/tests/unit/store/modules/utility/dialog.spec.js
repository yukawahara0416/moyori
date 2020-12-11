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

  it('dialogSpotCreate', () => {
    store.replaceState({ dialogSpotCreate: true })
    expect(store.getters['dialogSpotCreate']).toBe(true)
  })

  it('dialogSpotEdit', () => {
    store.replaceState({ dialogSpotEdit: true })
    expect(store.getters['dialogSpotEdit']).toBe(true)
  })

  it('dialogTutorial', () => {
    store.replaceState({ dialogTutorial: true })
    expect(store.getters['dialogTutorial']).toBe(true)
  })
})

describe('mutations', () => {
  it('dialogOn', () => {
    store.commit('dialogOn', 'dialogSign')
    expect(store.state.dialogSign).toBe(true)
  })

  it('dialogOff', () => {
    store.replaceState({ dialogSign: true })
    store.commit('dialogOff', 'dialogSign')
    expect(store.state.dialogSign).toBe(false)
  })

  it('dialogOffAll', () => {
    store.replaceState({ dialogSign: true })
    store.replaceState({ dialogSpotCreate: true })
    store.replaceState({ dialogSpotEdit: true })
    store.commit('dialogOffAll')
    expect(store.state.dialogSign).toBe(false)
    expect(store.state.dialogSpotCreate).toBe(false)
    expect(store.state.dialogSpotEdit).toBe(false)
  })
})

describe('actions', () => {
  it('dialogOn', () => {
    store.dispatch('dialogOn', 'dialogSign').then(() => {
      expect(store.state.dialogSign).toBe(true)
    })
  })

  it('dialogOff', () => {
    store.replaceState({ dialogSign: true })
    store.dispatch('dialogOff').then(() => {
      expect(store.state.dialogSign).toBe(false)
    })
    store.replaceState({ dialogSign: true })
    store.dispatch('dialogOff', 'dialogSpotCreate').then(() => {
      expect(store.state.dialogSign).toBe(true)
    })
  })
})
