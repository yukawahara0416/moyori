import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Comment/CommentIndexDeleteButtonDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth
let tab

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1 } },
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

  tab = {
    getters: {
      profileTab: () => 'posts'
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      tab
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

  it('comment', () => {
    expect(wrapper.props().comment).toStrictEqual(propsData.comment)
    expect(wrapper.props().comment instanceof Object).toBe(true)
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })

  it('profileTab', () => {
    expect(wrapper.vm.profileTab).toEqual(store.getters.profileTab)
  })
})

describe('v-on', () => {
  it('click closeDialog', () => {
    const closeDialog = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        closeDialog
      }
    })

    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')

    expect(closeDialog).toHaveBeenCalled()
  })
})
