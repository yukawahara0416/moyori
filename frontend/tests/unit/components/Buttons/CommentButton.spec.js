import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/CommentButton.vue'
import SpotDetailCommentPanel from '@/components/Spot/SpotDetailCommentPanel.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData

let store
let auth

const hasComment = {
  data: { id: 1, place_id: '1234567890test' },
  comments: [
    { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const notHasComment = {
  data: { id: 1, place_id: '1234567890test' },
  comments: [
    // { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

beforeEach(() => {
  propsData = {
    spot: new Spot(hasComment)
  }

  auth = {
    getters: {
      currentUser: () => {
        return {
          data: { id: 1 }
        }
      },
      isLoggingIn: () => true
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

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('computed', () => {
  it('isCommenting is true', () => {
    expect(wrapper.vm.isCommenting).toBeTruthy()
  })

  it('isCommenting is false', () => {
    wrapper.setProps({ spot: new Spot(notHasComment) })
    expect(wrapper.vm.isCommenting).toBeFalsy()
  })

  it('yourComments', () => {
    expect(wrapper.vm.yourComments).toMatchObject([hasComment.comments[0]])
  })
})

describe('v-on', () => {
  it('click openDialog', () => {
    const openDialog = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        openDialog
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(openDialog).toHaveBeenCalled()
  })

  it('mouseover mouseover', () => {
    const mouseover = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        mouseover
      }
    })

    wrapper.find('.v-btn').trigger('mouseover')
    expect(mouseover).toHaveBeenCalled()
  })

  it('mouseleave mouseleave', () => {
    const mouseleave = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        mouseleave
      }
    })

    wrapper.find('.v-btn').trigger('mouseleave')
    expect(mouseleave).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('openDialog', () => {
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBeTruthy()
  })

  it('mouseover', () => {
    wrapper.vm.mouseover()
    expect(wrapper.vm.icon).toEqual('mdi-message')
    expect(wrapper.vm.color).toEqual('success')
  })

  it('mouseleave', () => {
    wrapper.vm.mouseleave()
    expect(wrapper.vm.icon).toEqual('mdi-message')
    expect(wrapper.vm.color).toEqual('#757575')
  })
})

describe('template', () => {
  it('v-if="isCommenting"', () => {
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-message')
  })

  it('v-else', () => {
    wrapper.setProps({ spot: new Spot(notHasComment) })
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-message')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('Counter has :spot', () => {
    expect(wrapper.find('counter-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('spot-detail-comment-panel has :spot', () => {
    expect(wrapper.find(SpotDetailCommentPanel).props().spot).toMatchObject(
      propsData.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
