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

describe('methods', () => {
  it('openDialog', () => {
    const tab = 'signup'

    wrapper.vm.openDialog(tab)
    expect(dialog.mutations.changeSignTab).toHaveBeenCalledWith(
      expect.any(Object),
      tab
    )
    expect(dialog.mutations.dialogOn).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogSign'
    )
  })
})

describe('template', () => {
  it('v-dialog has value', () => {
    expect(wrapper.find('v-dialog-stub').attributes().value).toEqual(
      wrapper.vm.dialogSign.toString()
    )
  })

  it('v-btn has small', () => {
    const smAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.sm - 1
    Object.assign(window, { innerWidth: smAndDown })

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['sign-container', 'v-dialog']
    })

    expect(
      wrapper
        .findAll('.v-btn')
        .at(0)
        .classes()
    ).toContain('v-size--small')

    expect(
      wrapper
        .findAll('.v-btn')
        .at(1)
        .classes()
    ).toContain('v-size--small')

    expect(wrapper.vm.$vuetify.breakpoint.smAndDown).toBeTruthy()

    Object.assign(window, { innerWidth: 1024 })
  })

  it('v-btn not has small', () => {
    const md = wrapper.vm.$vuetify.breakpoint.thresholds.md
    Object.assign(window, { innerWidth: md })

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['sign-container', 'v-dialog']
    })

    expect(
      wrapper
        .findAll('.v-btn')
        .at(0)
        .classes()
    ).toContain('v-size--default')

    expect(
      wrapper
        .findAll('.v-btn')
        .at(1)
        .classes()
    ).toContain('v-size--default')

    expect(wrapper.vm.$vuetify.breakpoint.smAndDown).toBeFalsy()

    Object.assign(window, { innerWidth: 1024 })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
