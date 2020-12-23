import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActionsEditDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth
let snackbar

beforeEach(() => {
  propsData = {
    user: {
      data: {
        id: 1,
        name: 'test',
        email: 'test',
        avatar: 'test'
      }
    }
  }

  auth = {
    getters: {
      headers: () => {
        return {
          data: {
            id: 1
          }
        }
      }
    }
  }

  snackbar = {
    actions: {
      pushSnackbarSuccess: jest.fn(),
      pushSnackbarError: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      snackbar
    }
  })
})

describe('getters', () => {
  it('headers', () => {
    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      stubs: ['ValidationObserver']
    })
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })
})

describe('methods', () => {
  it('cancelUpdateAccount', () => {
    const closeDialog = jest.fn()
    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: { closeDialog },
      stubs: ['ValidationObserver']
    })
    wrapper.vm.cancelUpdateAccount()
    expect(closeDialog).toHaveBeenCalled()
    expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalled()
  })

  it('$emit/closeDialog', () => {
    const clearForm = jest.fn()
    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: { clearForm },
      stubs: ['ValidationObserver']
    })
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })

  it('clearForm', () => {
    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      stubs: ['ValidationObserver']
    })
    wrapper.vm.name = 'update'
    wrapper.vm.clearForm()
    expect(wrapper.vm.name).toEqual(propsData.user.data.name)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
