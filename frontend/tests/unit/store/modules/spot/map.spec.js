import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import map from '@/store/modules/spot/map.js'
import cloneDeep from 'lodash/cloneDeep'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(map))
})

const mapObject = { obj1: 'obj1' }
const googleObject = { obj2: 'obj2' }

describe('getters', () => {
  it('map', () => {
    store.replaceState({ map: mapObject })
    expect(store.getters['map']).toEqual(mapObject)
  })

  it('google', () => {
    store.replaceState({ google: googleObject })
    expect(store.getters['google']).toEqual(googleObject)
  })
})

describe('mutations', () => {
  it('mapMutation', () => {
    store.commit('mapMutation', mapObject)
    expect(store.state.map).toStrictEqual(mapObject)
  })
  it('googleMutation', () => {
    store.commit('googleMutation', googleObject)
    expect(store.state.google).toStrictEqual(googleObject)
  })
})
