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

const message = 'test'
const color = 'success'

describe('mutations', () => {
  it('setMessage', () => {
    store.commit('setMessage', message)
    expect(store.state.message).toEqual(message)
  })

  it('setColor', () => {
    store.commit('setColor', color)
    expect(store.state.color).toEqual(color)
  })

  it('clearMessage', () => {
    store.replaceState({ message: message })
    store.commit('clearMessage')
    expect(store.state.message).toEqual('')
  })
})

describe('actions', () => {
  it('pushSnackbarSuccess', () => {
    store.replaceState({ message: '' })
    store.replaceState({ color: '' })
    store.dispatch('pushSnackbarSuccess', { message: message })
    expect(store.state.message).toEqual(message)
    expect(store.state.color).toEqual('success')
  })

  it('pushSnackbarError', () => {
    store.replaceState({ message: '' })
    store.replaceState({ color: '' })
    store.dispatch('pushSnackbarError', { message: message })
    expect(store.state.message).toEqual(message)
    expect(store.state.color).toEqual('error')
  })
})
