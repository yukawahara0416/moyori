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

const data = {
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

const init = {
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

describe('getters', () => {
  it('spotForm', () => {
    store.replaceState({ form: data })
    expect(store.getters['spotForm']).toEqual(data)
  })

  it('formData', () => {
    store.replaceState({ form: data })

    const formData = new FormData()
    const keys = Object.keys(store.state.form)
    for (let i = 0; i < keys.length; i++) {
      if (store.state.form[keys[i]] !== null)
        formData.append(`spot[${keys[i]}]`, store.state.form[keys[i]])
    }

    expect(store.getters['formData']).toMatchObject(formData)
  })
})

describe('mutations', () => {
  it('setForm', () => {
    store.commit('setForm', data)
    expect(store.state.form).toEqual(data)
  })

  it('clearForm', () => {
    store.replaceState({ form: data })
    store.commit('clearForm')
    expect(store.state.form).toMatchObject(init)
  })
})
