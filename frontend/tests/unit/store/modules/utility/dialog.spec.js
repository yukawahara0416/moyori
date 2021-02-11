import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import dialog from '@/store/modules/utility/dialog.js'
import cloneDeep from 'lodash/cloneDeep'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(dialog))
})

describe('getters', () => {
  it('dialogSign', () => {
    store.replaceState({ dialogSign: true })
    expect(store.getters['dialogSign']).toBeTruthy()
  })

  it('dialogSpotCreate', () => {
    store.replaceState({ dialogSpotCreate: true })
    expect(store.getters['dialogSpotCreate']).toBeTruthy()
  })

  it('dialogSpotEdit', () => {
    store.replaceState({ dialogSpotEdit: true })
    expect(store.getters['dialogSpotEdit']).toBeTruthy()
  })

  it('dialogTutorial', () => {
    store.replaceState({ dialogTutorial: true })
    expect(store.getters['dialogTutorial']).toBeTruthy()
  })
})

describe('mutations', () => {
  it('dialogOn', () => {
    store.commit('dialogOn', 'dialogSign')
    expect(store.state.dialogSign).toBeTruthy()
  })

  it('dialogOff', () => {
    store.replaceState({ dialogSign: true })
    store.commit('dialogOff', 'dialogSign')
    expect(store.state.dialogSign).toBeFalsy()
  })

  it('dialogOffAll', () => {
    store.replaceState({
      dialogSign: true,
      dialogSpotCreate: true,
      dialogSpotEdit: true,
      dialogTutorial: true
    })
    store.commit('dialogOffAll')
    expect(store.state.dialogSign).toBeFalsy()
    expect(store.state.dialogSpotCreate).toBeFalsy()
    expect(store.state.dialogSpotEdit).toBeFalsy()
    expect(store.state.dialogTutorial).toBeFalsy()
  })
})

describe('actions', () => {
  it('dialogOff target true => mutations/dialogOff', () => {
    store.replaceState({ dialogSign: true })
    store.dispatch('dialogOff', 'dialogSpotCreate').then(() => {
      expect(store.state.dialogSign).toBeTruthy()
    })
  })

  it('dialogOff target false => mutations/dialogOffAll', () => {
    store.replaceState({ dialogSign: true })
    store.dispatch('dialogOff').then(() => {
      expect(store.state.dialogSign).toBeFalsy()
    })
  })
})
