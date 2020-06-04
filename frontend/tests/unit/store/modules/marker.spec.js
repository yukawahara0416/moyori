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
        { name: 'hoge', icon: 'foo' },
        { name: 'fuga', icon: 'bar' }
      ]
    }
    store.commit('setMarkers', setData.markers)
    expect(store.state.markers).toStrictEqual(setData.markers)
  })

  it('clearMarkers', () => {
    const setData = {
      markers: [
        { name: 'hoge', icon: 'foo' },
        { name: 'fuga', icon: 'bar' }
      ]
    }
    store.commit('setMarkers', setData.markers)
    store.commit('clearMarkers')
    expect(store.state.markers).toStrictEqual([])
  })

  it('setCurrentMarker', () => {
    const setData = {
      currentMarker: { id: 11, icon: 'hoge' }
    }
    store.commit('setCurrentMarker', setData.currentMarker)
    expect(store.state.currentMarker).toStrictEqual(setData.currentMarker)
  })

  it('clearCurrentMarker', () => {
    const setData = {
      currentMarker: { id: 11, icon: 'hoge' }
    }
    store.commit('setCurrentMarker', setData.currentMarker)
    store.commit('clearCurrentMarker')
    expect(store.state.currentMarker).toStrictEqual({ icon: '', id: -1 })
  })
})
