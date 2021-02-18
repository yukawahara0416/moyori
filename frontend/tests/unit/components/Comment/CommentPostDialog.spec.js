import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Comment/CommentPostDialog.vue'
import CommentPostDialogForm from '@/components/Comment/CommentPostDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData

let store
let auth
let tab
let dialog
let snackbar

beforeEach(() => {
  propsData = {
    spot: new Spot({ data: { id: 1 } })
  }

  auth = {
    getters: {
      isLoggingIn: () => true
    }
  }

  tab = {
    mutations: {
      changeSignTab: jest.fn()
    }
  }

  dialog = {
    mutations: {
      dialogOn: jest.fn()
    }
  }

  snackbar = {
    actions: {
      pushSnackbarError: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      tab,
      dialog,
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
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('v-on', () => {
  it('click commentHandler', () => {
    const commentHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        commentHandler
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(commentHandler).toHaveBeenCalled()
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('methods', () => {
  describe('commentHandler', () => {
    // ログインしていない場合はunVoteせず、ログインを促す
    it('isLoggingIn is false', () => {
      auth.getters.isLoggingIn = () => false

      store = new Vuex.Store({
        modules: {
          auth,
          tab,
          dialog,
          snackbar
        }
      })

      wrapper = shallowMount(Component, {
        localVue,
        propsData,
        store
      })

      expect.assertions(4)

      wrapper.vm.commentHandler()
      expect(store.getters.isLoggingIn).toBeFalsy()
      expect(tab.mutations.changeSignTab).toHaveBeenCalledWith(
        expect.any(Object),
        'signin'
      )
      expect(dialog.mutations.dialogOn).toHaveBeenCalledWith(
        expect.any(Object),
        'dialogSign'
      )
      expect(snackbar.actions.pushSnackbarError).toHaveBeenCalledWith(
        expect.any(Object),
        {
          message: 'ログインしてください'
        }
      )
    })

  })

  it('closeDialog', () => {
    wrapper.setData({ dialog: true })

    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).toBeFalsy()
  })
})

describe('template', () => {
  it('CommentPostDialogForm has :spot', () => {
    expect(wrapper.find(CommentPostDialogForm).props().spot).toEqual(
      wrapper.vm.$props.spot
    )
  })

  it('CommentPostDialogForm has :dialog', () => {
    expect(wrapper.find(CommentPostDialogForm).props().dialog).toEqual(
      wrapper.vm.$props.dialog
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
