import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
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
          data: { id: 1 }
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

  wrapper = shallowMount(Component, {
    localVue,
    store,
    vuetify,
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
    let openDialog

    beforeEach(() => {
      openDialog = jest.fn()

      wrapper = mount(Component, {
        localVue,
        store,
        vuetify,
        methods: {
          openDialog
        },
        stubs: ['sign-container', 'v-dialog']
      })
    })

    it('openDialog signin', () => {
      wrapper
        .findAll('.v-btn')
        .at(0)
        .trigger('click')
      expect(openDialog).toHaveBeenCalledWith('signin')
      expect(openDialog).not.toHaveBeenCalledWith('signup')
    })

    it('openDialog signup', () => {
      wrapper
        .findAll('.v-btn')
        .at(1)
        .trigger('click')
      expect(openDialog).toHaveBeenCalledWith('signup')
      expect(openDialog).not.toHaveBeenCalledWith('signin')
    })
  })
})
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
