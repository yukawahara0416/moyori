import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Comment/CommentIndexDeleteButtonDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

beforeEach(() => {
  propsData = {
    spot: new Spot({ data: { id: 1 } }),
    comment: { id: 1 }
  }

  auth = {
    getters: {
      headers: () => {
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

  it('comment', () => {
    expect(wrapper.vm.$props.comment).toStrictEqual(propsData.comment)
    expect(wrapper.vm.$props.comment instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.comment.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })
})

describe('v-on', () => {
  const closeDialog = jest.fn()
  const deleteCommentHandler = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        closeDialog,
        deleteCommentHandler
      }
    })
  })

  it('click closeDialog', () => {
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')

    expect(closeDialog).toHaveBeenCalled()
  })

  it('click deleteCommentHandler', () => {
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')

    expect(deleteCommentHandler).toHaveBeenCalled()
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
