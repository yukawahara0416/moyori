import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotEditDialog.vue'
import SpotEditDialogForm from '@/components/Spot/SpotEditDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let dialog

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1 }
    })
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
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
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
    expect(dialog.actions.dialogOff).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogSpotEdit'
    )
  })
})

describe('v-on', () => {
  it('openDialog', () => {
    const openDialog = jest.fn()

    dialog.getters.dialogSpotEdit = () => false

    store = new Vuex.Store({
      modules: {
        dialog
      }
    })

    wrapper = mount(Component, {
      localVue,
      propsData,
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
    expect(dialog.mutations.dialogOn).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogSpotEdit'
    )
  })
})

describe('template', () => {
  it('SpotEditDialogForm has :spot', () => {
    expect(wrapper.find(SpotEditDialogForm).props().spot).toEqual(
      wrapper.vm.$props.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
