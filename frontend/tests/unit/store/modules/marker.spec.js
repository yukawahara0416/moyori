import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import markerStore from '@/store/modules/marker.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(markerStore))
})

describe('mutations', () => {
  it('setMarkers', () => {
    const setData = {
      markers: [
        { data: { name: 'hoge', icon: 'foo' } },
        { data: { name: 'fuga', icon: 'bar' } }
      ]
    }
    store.commit('setMarkers', setData.markers)
    expect(store.state.markers).toStrictEqual(setData.markers)
  })

  it('clearMarkers', () => {
    const setData = {
      markers: [
        { data: { name: 'hoge', icon: 'foo' } },
        { data: { name: 'fuga', icon: 'bar' } }
      ]
    }
    store.commit('setMarkers', setData.markers)
    store.commit('clearMarkers')
    expect(store.state.markers).toStrictEqual([])
  })

  it('clearIcon', () => {})
  it('cacheIcon', () => {})
  it('setIcon', () => {})
})
