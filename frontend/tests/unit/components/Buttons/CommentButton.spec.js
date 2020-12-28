import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/CommentButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let options
let data
let auth

beforeEach(() => {
  options = {
    data: { id: 1 },
    comments: [
      { id: 1, user_id: 1 },
      { id: 2, user_id: 2 }
    ]
  }

  data = new Spot(options)

  propsData = {
    spot: data
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
    expect(wrapper.vm.isCommenting).toBe(true)
  })

  it('isCommenting is false', () => {
    options = {
      data: { id: 1 },
      comments: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ]
    }

    data = new Spot(options)

    propsData = {
      spot: data
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.vm.isCommenting).toBe(false)
  })

  it('yourComments', () => {
    expect(wrapper.vm.yourComments).toMatchObject([options.comments[0]])
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
    expect(wrapper.vm.dialog).toBe(true)
  })

  it('mouseover', () => {
    wrapper.vm.mouseover()
    expect(wrapper.vm.icon).toEqual('mdi-message')
    expect(wrapper.vm.color).toEqual('success')
  })

  it('mouseleave', () => {
    wrapper.vm.mouseleave()
    expect(wrapper.vm.icon).toEqual('mdi-message-outline')
    expect(wrapper.vm.color).toEqual(null)
  })
})

describe('template', () => {
  it('v-if="isCommenting"', () => {
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-message')
  })

  it('v-else', () => {
    options = {
      data: { id: 1 },
      comments: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ]
    }

    data = new Spot(options)

    propsData = {
      spot: data
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-message-outline')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('counter has :spot', () => {
    expect(wrapper.find('counter-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('spot-detail-comment-panel has :spot', () => {
    expect(
      wrapper.find('spot-detail-comment-panel-stub').attributes().spot
    ).toEqual('[object Object]')
  })

})
