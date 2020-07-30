import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import snackbar from '@/store/modules/utility/snackbar.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(snackbar))
})

describe('mutations', () => {
  it('setMessage', () => {
    const message = 'test'
    store.commit('setMessage', message)
    expect(store.state.message).toEqual(message)
  })
  it('setColor', () => {
    const color = 'success'
    store.commit('setColor', color)
    expect(store.state.color).toEqual(color)
  })
  it('clearMessage', () => {
    store.replaceState({ message: 'test' })
    store.commit('clearMessage')
    expect(store.state.message).toEqual('')
  })
})

describe('actions', () => {
  it('pushSnackbar', () => {
    const message = 'test'
    const color = 'success'
    store.dispatch('pushSnackbar', { message, color }).then(res => {
      expect(store.state.message).toBe(message)
      expect(store.state.color).toBe(color)
    })
  })
  it('clearSnackbar', () => {
    store.replaceState({ message: 'test' })
    store.dispatch('clearSnackbar').then(res => {
      expect(store.state.message).toBe('')
    })
  })
})
