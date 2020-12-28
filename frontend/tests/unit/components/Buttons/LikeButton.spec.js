import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/LikeButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let options
let data

let store
let auth
let form
let map
let tab

beforeEach(() => {
  options = {
    data: { id: 1 },
    likes: [
      { id: 1, user_id: 1 },
      { id: 2, user_id: 2 }
    ]
  }

  data = new Spot(options)

  propsData = {
    spot: data
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

  form = {
    getters: {
      form: () => {
        return {
          place_id: ''
        }
      }
    }
  }

  map = {
    getters: {
      map: () => {
        return {
          data: 'test'
        }
      }
    }
  }

  tab = {
    getters: {
      profileTab: () => 'posts'
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      form,
      map,
      tab
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })

  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toEqual(store.getters.currentUser)
    expect(wrapper.vm.currentUser).toEqual(getters.currentUser())
  })

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('computed', () => {
  it('isLiking is true', () => {
    expect(wrapper.vm.isLiking).toBe(true)
  })

  it('isLiking is false', () => {
    options = {
      data: { id: 1 },
      likes: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ]
    }

    data = new Spot(options)

    propsData = {
      spot: data
    }

    store = new Vuex.Store({
      modules: {
        auth,
        form,
        map,
        tab
      }
    })

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.vm.isLiking).toBe(false)
  })

  it('yourLike', () => {
    expect(wrapper.vm.yourLike).toMatchObject([options.likes[0]])
  })
})

describe('v-on', () => {
  it('likeHandler', () => {
    const likeHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        likeHandler
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(likeHandler).toHaveBeenCalled()
  })

})

describe('actions', () => {
  it('map/saveSpot', () => {
    wrapper.vm.saveSpot()
    expect(map.actions.saveSpot).toHaveBeenCalled()
  })
  it('like', () => {
    wrapper.vm.like()
    expect(actions.like).toHaveBeenCalled()
  })
  it('unlike', () => {
    wrapper.vm.unlike()
    expect(actions.unlike).toHaveBeenCalled()
  })
  it('pushSnackbar', () => {
    wrapper.vm.pushSnackbar()
    expect(actions.pushSnackbar).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
