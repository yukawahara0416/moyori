import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import form from '@/store/modules/spot/form.js'
import cloneDeep from 'lodash/cloneDeep'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(form))
})

const initData = {
  place_id: '',
  name: '',
  address: '',
  photo_reference: null,
  picture: null,
  phone: null,
  lat: '',
  lng: '',
  url: null
}

const inputData = {
  place_id: 'test',
  name: 'test',
  address: 'test',
  photo_reference: 'test',
  picture: 'test',
  phone: 'test',
  lat: 'test',
  lng: 'test',
  url: 'test'
}

describe('getters', () => {
  it('spotForm', () => {
    store.replaceState({ spotForm: inputData })
    expect(store.getters['spotForm']).toEqual(inputData)
  })

  it('formData', () => {
    store.replaceState({ spotForm: inputData })

    const formData = new FormData()
    const keys = Object.keys(store.state.spotForm)
    for (let i = 0; i < keys.length; i++) {
      if (store.state.spotForm[keys[i]] !== null)
        formData.append(`spot[${keys[i]}]`, store.state.spotForm[keys[i]])
    }

    expect(store.getters['formData']).toMatchObject(formData)
  })
})

describe('mutations', () => {
  it('setSpotForm', () => {
    store.commit('setSpotForm', inputData)
    expect(store.state.spotForm).toMatchObject(inputData)
  })

  it('clearSpotForm', () => {
    store.replaceState({ spotForm: inputData })
    store.commit('clearSpotForm')
    expect(store.state.spotForm).toMatchObject(initData)
  })
})
