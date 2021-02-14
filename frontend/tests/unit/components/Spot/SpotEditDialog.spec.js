import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Spot/SpotEditDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let dialog

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 }
    }
  }

  dialog = {
    getters: {
      dialogSpotEdit: () => false
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
    propsData,
    store
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBeTruthy()
  })
})

describe('getters', () => {
  it('dialogSpotEdit', () => {
    expect(wrapper.vm.dialogSpotEdit).toBe(store.getters.dialogSpotEdit)
  })
})

describe('computed', () => {
  it('dialog/get', () => {
    expect(wrapper.vm.dialog).toBe(store.getters.dialogSpotEdit)
  })

  it('dialog/set', () => {
    wrapper.vm.dialog = true
    expect(dialog.actions.dialogOff).toHaveBeenCalled()
  })
})

describe('v-on', () => {
  it('openDialog', () => {
    const openDialog = jest.fn()

    dialog = {
      getters: {
        dialogSpotEdit: () => false
      }
    }

    store = new Vuex.Store({
      modules: {
        dialog
      }
    })

    wrapper = mount(Component, {
      localVue,
      store,
      methods: {
        openDialog
      }
    })

    wrapper.find('.v-btn').trigger('click')
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
  it('spot-edit-dialog-form has :spot', () => {
    expect(
      wrapper.find('spot-edit-dialog-form-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
