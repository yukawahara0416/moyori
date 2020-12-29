import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Comment/CommentIndex.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 },
      comments: [
        { id: 1, user_id: 1 },
        { id: 2, user_id: 2 }
      ]
    }
  }

  auth = {
    getters: {
      currentUser: () => {
        return {
          data: { id: 1 }
        }
      }
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('getters', () => {
  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toMatchObject(store.getters.currentUser)
  })
})

describe('computed', () => {
  it('isCommentingByCurrentUser', () => {
    const comment = propsData.spot.comments[0]
    expect(wrapper.vm.isCommentingByCurrentUser(comment)).toBe(true)
  })
})

describe('template', () => {
  it('comment-index-avatar has :comment', () => {
    expect(
      wrapper.find('comment-index-avatar-stub').attributes().comment
    ).toEqual('[object Object]')
  })

  it('comment-index-username has :comment', () => {
    expect(
      wrapper.find('comment-index-username-stub').attributes().comment
    ).toEqual('[object Object]')
  })

})
