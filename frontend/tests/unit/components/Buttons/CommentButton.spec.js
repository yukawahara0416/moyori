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

})
