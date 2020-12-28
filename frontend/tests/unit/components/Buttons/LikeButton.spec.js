import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let map
let getters
let actions
let store

beforeEach(() => {
  propsData = {
    spot: {
      marker: { name: 'test' },
      data: { id: 1 },
      likes: [{ data: { id: 1 } }]
    },
    id: 1,
    type: 'map'
  }

  map = {
    namespaced: true,
    actions: {
      saveSpot: jest.fn()
    }
  }

  getters = {
    headers: () => ({ uid: 'tester@example.com' }),
    currentUser: () => ({ data: { id: 1 } })
  }

  actions = {
    like: jest.fn(),
    unlike: jest.fn(),
    pushSnackbar: jest.fn()
  }

  store = new Vuex.Store({
    modules: {
      map
    },
    getters,
    actions
  })

  wrapper = mount(Component, {
    localVue,
    propsData,
    store,
    stubs: ['counter']
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
  it('type', () => {
    expect(wrapper.props().type).toStrictEqual(propsData.type)
    expect(typeof wrapper.vm.$props.type).toBe('string')
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(getters.headers())
  })
  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toEqual(getters.currentUser())
  })
})

// describe('computed', () => {
//   it('isLoggedIn', () => {})
//   it('isLiked', () => {})
//   it('ownLike', () => {})
// })

describe('v-on', () => {
  it('likeHandler', () => {
    const event = jest.fn()
    wrapper.setMethods({ likeHandler: event })
    wrapper.find('.v-btn').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
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
