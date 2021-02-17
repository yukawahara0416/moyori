import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Comment/CommentPostDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

beforeEach(() => {
  propsData = {
    spot: new Spot({ data: { id: 1 } })
  }

  auth = {
    getters: {
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
  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('v-on', () => {
  it('click commentHandler', () => {
    const commentHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        commentHandler
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(commentHandler).toHaveBeenCalled()
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('methods', () => {
  it('closeDialog', () => {
    wrapper.vm.dialog = true
    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).toBeFalsy()
  })
})

describe('template', () => {
  it('comment-post-dialog-form has :spot', () => {
    expect(
      wrapper.find('comment-post-dialog-form-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
