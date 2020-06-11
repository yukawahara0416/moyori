import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import spotStore from '@/store/modules/spot.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(spotStore))
})

describe('mutations', () => {
  it('addSpots', () => {
    const setData = {
      spots: [
        { marker: { name: 'hoge', icon: 'foo' } },
        { marker: { name: 'fuga', icon: 'bar' } }
      ]
    }
    store.commit('addSpots', setData.spots)
    expect(store.state.spots).toStrictEqual(setData.spots)
  })

  it('clearSpots', () => {
    const setData = {
      spots: [
        { marker: { name: 'hoge', icon: 'foo' } },
        { marker: { name: 'fuga', icon: 'bar' } }
      ]
    }
    store.commit('addSpots', setData.spots)
    store.commit('clearSpots')
    expect(store.state.spots).toStrictEqual([])
  })

  it('clearIcon', () => {})
  it('cacheIcon', () => {})
  it('setIcon', () => {})
})
