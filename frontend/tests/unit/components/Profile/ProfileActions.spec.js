import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActions.vue'
import ProfileActionsEditButton from '@/components/Profile/ProfileActionsEditButton.vue'
import ProfileActionsSignOutButton from '@/components/Profile/ProfileActionsSignOutButton.vue'
import ProfileActionsDeleteButton from '@/components/Profile/ProfileActionsDeleteButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

beforeEach(() => {
  propsData = {
    id: 1,
    user: { data: { id: 1 } },
    currentUser: { data: { id: 1 } }
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
  it('id', () => {
    expect(wrapper.vm.$props.id).toStrictEqual(propsData.id)
    expect(typeof wrapper.vm.$props.id).toBe('number')
    expect(wrapper.vm.$options.props.id.required).toBeTruthy()
  })

  it('user', () => {
    expect(wrapper.vm.$props.user).toStrictEqual(propsData.user)
    expect(wrapper.vm.$props.user instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.user.required).toBeTruthy()
  })

  it('currentUser', () => {
    expect(wrapper.vm.$props.currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.vm.$props.currentUser instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.currentUser.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toEqual(store.getters.isLoggingIn)
  })
})

describe('computed', () => {
  it('isOwnPage', () => {
    expect(wrapper.vm.isOwnPage).toBeTruthy()
  })
})

describe('template', () => {
  it('v-if buttons', () => {
    expect(wrapper.find('v-row-stub').exists()).toBeTruthy()
    expect(wrapper.find(ProfileActionsEditButton).exists()).toBeTruthy()
    expect(wrapper.find(ProfileActionsSignOutButton).exists()).toBeTruthy()
    expect(wrapper.find(ProfileActionsDeleteButton).exists()).toBeTruthy()
  })

  // has :id


  it('ProfileActionsEditButton has :id', () => {
    expect(wrapper.find(ProfileActionsEditButton).props().id).toEqual(
      wrapper.vm.$props.id
    )
  })

  it('ProfileActionsEditButton has :user', () => {
    expect(wrapper.find(ProfileActionsEditButton).props().user).toEqual(
      wrapper.vm.$props.user
    )
  })

  it('ProfileActionsDeleteButton has :id', () => {
    expect(wrapper.find(ProfileActionsDeleteButton).props().id).toEqual(
      wrapper.vm.$props.id
    )
  })
  it('ProfileActionsDeleteButton has :user', () => {
    expect(wrapper.find(ProfileActionsDeleteButton).props().user).toEqual(
      wrapper.vm.$props.user
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
