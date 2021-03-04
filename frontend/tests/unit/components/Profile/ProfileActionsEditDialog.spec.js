import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import Component from '@/components/Profile/ProfileActionsEditDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)

const axiosMock = new MockAdapter(axiosBase)

let wrapper
let propsData
let store
let auth
let user
let snackbar

beforeEach(() => {
  propsData = {
    user: {
      data: {
        id: 1,
        name: 'name',
        email: 'email',
        avatar: 'avatar'
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
    },
    mutations: {
      updateCurrentUser: jest.fn()
    }
  }

  user = {
    namespaced: true,
    mutations: {
      updateUser: jest.fn()
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
      user,
      snackbar
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('props', () => {
  it('user', () => {
    expect(wrapper.vm.$props.user).toStrictEqual(propsData.user)
    expect(wrapper.vm.$props.user instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.user.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })
})

describe('computed', () => {
  it('formData', async () => {
    await wrapper.setData({ image: 'image' })

    const formData = new FormData()
    formData.append('[name]', wrapper.vm.name)
    formData.append('[email]', wrapper.vm.email)
    formData.append('[avatar]', wrapper.vm.image)

    expect(wrapper.vm.formData).toEqual(formData)
  })
})

describe('methods', () => {
  it('updateAccountHandler', () => {})

  it('updateAccount 200', () => {
    const response = { data: { id: 1 } }

    axiosMock.onPatch('/api/v1/auth/').reply(200, response)

    return wrapper.vm.updateAccount().then(res => {
      expect(res).toMatchObject(response.data)
    })
  })

  it('updateAccount 404', () => {
    axiosMock.onPatch('/api/v1/auth/').reply(404)

    return wrapper.vm.updateAccount().catch(err => {
      expect(err).toStrictEqual(new Error('アカウントの編集に失敗しました'))
    })
  })

  it('storeMutation', () => {
    const update = {
      name: 'up_name',
      email: 'up_email',
      avatar: 'up_avatar'
    }
    wrapper.vm.storeMutation(update)

    expect(auth.mutations.updateCurrentUser).toHaveBeenCalledWith(
      expect.any(Object),
      {
        name: update.name,
        email: update.email,
        avatar: update.avatar
      }
    )
    expect(user.mutations.updateUser).toHaveBeenCalledWith(expect.any(Object), {
      name: update.name,
      email: update.email,
      avatar: update.avatar
    })
  })

  it('cancelUpdateAccount', () => {
    const closeDialog = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: { closeDialog }
    })

    wrapper.vm.cancelUpdateAccount()
    expect(closeDialog).toHaveBeenCalled()
    expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
      expect.any(Object),
      {
        message: 'スポットの編集をキャンセルしました'
      }
    )
  })

  it('closeDialog', () => {
    const clearForm = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: { clearForm }
    })

    wrapper.vm.closeDialog()
    expect(wrapper.emitted().closeDialog).toBeTruthy()
    expect(clearForm).toHaveBeenCalled()
  })

  it('clearForm', async () => {
    await wrapper.setData({
      name: 'up_name',
      email: 'up_email',
      avatar: 'up_avatar',
      image: 'up_image',
      uploadImageUrl: 'up_url'
    })

    wrapper.vm.clearForm()
    expect(wrapper.vm.name).toEqual(wrapper.vm.$props.user.data.name)
    expect(wrapper.vm.email).toEqual(wrapper.vm.$props.user.data.email)
    expect(wrapper.vm.avatar).toEqual(wrapper.vm.$props.user.data.avatar)
    expect(wrapper.vm.image).toBeNull()
    expect(wrapper.vm.uploadImageUrl).toBeNull()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
