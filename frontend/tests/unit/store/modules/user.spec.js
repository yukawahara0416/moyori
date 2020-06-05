import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import userStore from '@/store/modules/user.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(userStore))
})

describe('mutations', () => {
  it('setCurrentUser', () => {
    const setData = {
      user: { name: 'hoge', email: 'huga@example.com' }
    }
    store.commit('setCurrentUser', setData)
    expect(store.state.currentUser).toStrictEqual(setData.user)
  })

  it('signInFormData', () => {
    const setData = {
      headers: {
        'access-token': 'hoge',
        client: 'huga',
        'content-type': 'moge',
        uid: 'puga'
      }
    }
    store.commit('setSignInFormData', setData)
    expect(store.state.headers).toHaveProperty('access-token')
    expect(store.state.headers).toHaveProperty('client')
    expect(store.state.headers).toHaveProperty('content-type')
    expect(store.state.headers).toHaveProperty('uid')
  })

  it('signOut', () => {
    const setData = {
      user: { name: 'hoge', email: 'huga@example.com' }
    }
    store.commit('setCurrentUser', setData)
    store.commit('signOut')
    expect(store.state.currentUser).toBe(null)
  })
})
