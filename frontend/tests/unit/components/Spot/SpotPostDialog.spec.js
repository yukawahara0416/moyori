import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Spot/SpotPostDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let dialog

beforeEach(() => {
  dialog = {
    getters: {
      dialogSpotCreate: () => false
    },
    mutations: {
      dialogOn: jest.fn()
    },
    actions: {
      dialogOff: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      dialog
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('getters', () => {
  it('dialogSpotCreate', () => {
    expect(wrapper.vm.dialogSpotCreate).toBe(store.getters.dialogSpotCreate)
  })
})

describe('computed', () => {
  it('dialog/get', () => {
    expect(wrapper.vm.dialog).toBe(store.getters.dialogSpotCreate)
  })

  it('dialog/set', () => {
    wrapper.vm.dialog = 'updata'
    expect(dialog.actions.dialogOff).toHaveBeenCalled()
  })
})

describe('v-on', () => {
  it('openDialog', () => {
    const openDialog = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      store,
      methods: {
        openDialog
      }
    })

    wrapper.find('div').trigger('click')
    expect(openDialog).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('openDialog', () => {
    wrapper.vm.openDialog()
    expect(dialog.mutations.dialogOn).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
