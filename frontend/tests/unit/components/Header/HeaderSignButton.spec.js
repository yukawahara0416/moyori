import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Header/HeaderSignButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let store
let auth
let dialog
let vuetify

beforeEach(() => {
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

  dialog = {
    getters: {
      dialogSign: () => true
    },
    mutations: {
      dialogOn: jest.fn(),
      changeSignTab: jest.fn()
    },
    actions: {
      dialogOff: jest.fn()
    }
  }

  vuetify = new Vuetify()

  store = new Vuex.Store({
    modules: {
      auth,
      dialog
    }
  })
})

describe('with mocked methods', () => {
  const openDialog = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store,
      methods: {
        openDialog
      },
      stubs: ['sign-container', 'v-dialog']
    })
  })

  describe('getters', () => {
    it('headers', () => {
      expect(wrapper.vm.headers).toEqual(store.getters.headers)
    })

    it('dialogSign', () => {
      expect(wrapper.vm.dialogSign).toEqual(store.getters.dialogSign)
    })
  })

  describe('computed', () => {
    it('dialog/get', () => {
      expect(wrapper.vm.dialog).toEqual(store.getters.dialogSign)
    })

    it('dialog/set', () => {
      wrapper.vm.dialog = false
      expect(dialog.actions.dialogOff).toHaveBeenCalled()
    })
  })

  describe('v-on', () => {
    it('dialogOn', () => {
      wrapper.find('.v-btn').trigger('click')
      expect(openDialog).toHaveBeenCalledTimes(1)
    })
  })
})

describe('without mocked methods', () => {
  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store,
      stubs: ['sign-container', 'v-dialog']
    })
  })

  it('test', () => {
    wrapper.vm.openDialog()
    expect(dialog.mutations.changeSignTab).toHaveBeenCalled()
    expect(dialog.mutations.dialogOn).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
