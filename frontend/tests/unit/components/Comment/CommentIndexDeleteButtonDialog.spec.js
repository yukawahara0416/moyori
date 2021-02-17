import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Comment/CommentIndexDeleteButtonDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData

let store
let auth
let vote
let tab
let dialog
let snackbar

let $route

beforeEach(() => {
  propsData = {
    spot: new Spot({ data: { id: 1 } }),
    comment: { id: 1 }
  }

  auth = {
    getters: {
      headers: () => {
        return {
          data: { id: 1 }
        }
      },
      currentUser: () => {
        return {
          data: { id: 1 }
        }
      },
      isLoggingIn: () => true
    }
  }

  vote = {
    actions: {
      unVote: jest.fn()
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
      pushSnackbarSuccess: jest.fn(),
      pushSnackbarError: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      vote,
      tab,
      dialog,
      snackbar
    }
  })

  $route = {
    name: null,
    params: null
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    mocks: {
      $route
    }
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })

  it('comment', () => {
    expect(wrapper.vm.$props.comment).toStrictEqual(propsData.comment)
    expect(wrapper.vm.$props.comment instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.comment.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })

  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toMatchObject(store.getters.currentUser)
  })

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('v-on', () => {
  const closeDialog = jest.fn()
  const deleteCommentHandler = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        closeDialog,
        deleteCommentHandler
      }
    })
  })

  it('click closeDialog', () => {
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')

    expect(closeDialog).toHaveBeenCalled()
  })

  it('click deleteCommentHandler', () => {
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')

    expect(deleteCommentHandler).toHaveBeenCalled()
  })
})

describe('methods', () => {
  describe('deleteCommentHandler', () => {
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
        store,
        mocks: {
          $route
        }
      })

      const route = 'search'
      wrapper.vm.$route.name = route
      wrapper.vm.$route.params = auth.getters.currentUser().data

      expect.assertions(5)

      return wrapper.vm
        .deleteCommentHandler(wrapper.vm.$props.spot)
        .then(() => {
          expect(store.getters.isLoggingIn).toBeFalsy()
          expect(tab.mutations.changeSignTab).toHaveBeenCalledWith(
            expect.any(Object),
            'signin'
          )
          expect(dialog.mutations.dialogOn).toHaveBeenCalledWith(
            expect.any(Object),
            'dialogSign'
          )
          expect(snackbar.actions.pushSnackbarSuccess).not.toHaveBeenCalled()
          expect(snackbar.actions.pushSnackbarError).toHaveBeenCalledWith(
            expect.any(Object),
            {
              message: new Error('ログインしてください')
            }
          )
        })
    })

    // ログインしている場合はunVoteします
    it('isLoggingIn is true', () => {
      auth.getters.isLoggingIn = () => true
      const closeDialog = jest.fn()

      store = new Vuex.Store({
        modules: {
          auth,
          vote,
          tab,
          dialog,
          snackbar
        }
      })

      wrapper = shallowMount(Component, {
        localVue,
        propsData,
        store,
        mocks: {
          $route
        },
        methods: {
          closeDialog
        }
      })

      const route = 'search'
      wrapper.vm.$route.name = route
      wrapper.vm.$route.params = auth.getters.currentUser().data

      expect.assertions(4)

      return wrapper.vm
        .deleteCommentHandler(wrapper.vm.$props.spot)
        .then(() => {
          expect(store.getters.isLoggingIn).toBeTruthy()
          expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
            expect.any(Object),
            {
              message: 'コメントを削除しました'
            }
          )
          expect(snackbar.actions.pushSnackbarError).not.toHaveBeenCalled()
          expect(closeDialog).toHaveBeenCalled()
        })
    })
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
