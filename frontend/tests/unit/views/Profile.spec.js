// props id
// created this.fetchData
// getter user
// getter currentUser

// mutations
// lodingOn
// lodingOff
// clearSpotsStore
// clearUserStore
// setUserStore

// actions
// getUser

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/views/Profile.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

// let wrapper
let store
let spot
let user

beforeEach(() => {
  spot = {
    namespaced: true,
    mutations: {}
  }

  user = {
    namespaced: true,
    mutations: {}
  }

  store = new Vuex.Store({
    modules: {
      spot,
      user
    }
  })

  // wrapper = shallowMount(Component, {
  //   localVue,
  //   store,
  //   methods: {
  //     fetchData
  //   }
  // })
})
