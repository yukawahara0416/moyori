import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Comment/CommentIndex.vue'
import CommentIndexAvatar from '@/components/Comment/CommentIndexAvatar.vue'
import CommentIndexUsername from '@/components/Comment/CommentIndexUsername.vue'
import CommentIndexDay from '@/components/Comment/CommentIndexDay.vue'
import CommentIndexDeleteButton from '@/components/Comment/CommentIndexDeleteButton.vue'
import CommentIndexContent from '@/components/Comment/CommentIndexContent.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1 },
      comments: [
        { id: 1, user_id: 1 },
        { id: 2, user_id: 2 }
      ]
    })
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
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
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
    expect(wrapper.vm.isCommentingByCurrentUser(comment)).toBeTruthy()
  })
})

describe('template', () => {
  it('CommentIndexAvatar has :comment', () => {
    expect(
      wrapper
        .findAll(CommentIndexAvatar)
        .at(0)
        .props().comment
    ).toMatchObject(propsData.spot.comments[0])
    expect(
      wrapper
        .findAll(CommentIndexAvatar)
        .at(1)
        .props().comment
    ).toMatchObject(propsData.spot.comments[1])
  })

  it('CommentIndexUsername has :comment', () => {
    expect(
      wrapper
        .findAll(CommentIndexUsername)
        .at(0)
        .props().comment
    ).toMatchObject(propsData.spot.comments[0])
    expect(
      wrapper
        .findAll(CommentIndexUsername)
        .at(1)
        .props().comment
    ).toMatchObject(propsData.spot.comments[1])
  })

  it('CommentIndexDay has :comment', () => {
    expect(
      wrapper
        .findAll(CommentIndexDay)
        .at(0)
        .props().comment
    ).toMatchObject(propsData.spot.comments[0])
    expect(
      wrapper
        .findAll(CommentIndexDay)
        .at(1)
        .props().comment
    ).toMatchObject(propsData.spot.comments[1])
  })

  it('CommentIndexDeleteButton has :comment', () => {
    expect(
      wrapper
        .findAll(CommentIndexDeleteButton)
        .at(0)
        .props().comment
    ).toMatchObject(propsData.spot.comments[0])
    expect(wrapper.findAll(CommentIndexDeleteButton).length).toEqual(1)
  })

  it('CommentIndexContent has :comment', () => {
    expect(
      wrapper
        .findAll(CommentIndexContent)
        .at(0)
        .props().comment
    ).toMatchObject(propsData.spot.comments[0])
    expect(
      wrapper
        .findAll(CommentIndexContent)
        .at(1)
        .props().comment
    ).toMatchObject(propsData.spot.comments[1])
  })

  it('v-if="isCommentingByCurrentUser(comment)"', () => {
    const spot = new Spot(notHasComment)

    wrapper.setProps({ spot })
    expect(wrapper.findAll(CommentIndexDeleteButton).length).toEqual(1)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
