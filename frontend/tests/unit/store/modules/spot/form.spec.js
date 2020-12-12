import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import form from '@/store/modules/spot/form.js'
import { cloneDeep } from 'lodash'

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
  image: 'test',
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
  image: null,
  picture: null,
  phone: null,
  lat: '',
  lng: '',
  url: null
}

describe('getters', () => {
  it('form', () => {
    store.replaceState({ form: data })
    expect(store.getters['form']).toEqual(data)
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
