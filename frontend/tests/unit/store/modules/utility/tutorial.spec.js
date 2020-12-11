import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import tutorial from '@/store/modules/utility/tutorial.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(tutorial))
})

describe('getters', () => {
  it('tutorialState', () => {
    store.replaceState({ tutorialState: false })
    expect(store.getters['tutorialState']).toBe(false)
  })
})

describe('mutations', () => {
  it('closeTutorial', () => {
    store.replaceState({ tutorialState: true })
    store.commit('closeTutorial')
    expect(store.state.tutorialState).toBe(false)
  })
})
