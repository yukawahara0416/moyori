import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Card/CardFrame.vue'
import CardFrameContent from '@/components/Card/CardFrameContent.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData

let store
let spot
let user
let tab

let $route

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1 } },
    id: 1
  }

  spot = {
    namespaced: true,
    actions: {
      spotlight: jest.fn()
    }
  }

  user = {
    namespaced: true,
    actions: {
      spotlight: jest.fn()
    }
  }

  tab = {
    getters: {
      profileTab: () => 'posts'
    }
  }

  store = new Vuex.Store({
    modules: {
      spot,
      user,
      tab
    }
  })

  // shallowMountを使う！！！
  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    mocks: {
      $route
    },
    stubs: ['card-frame-content']
  })
})

describe('props', () => {
  // beforeEach(() => {
  //   $route = {
  //     name: 'search'
  //   }

  //   wrapper = mount(Component, {
  //     localVue,
  //     propsData,
  //     store,
  //     mocks: {
  //       $route
  //     },
  //     stubs: ['card-frame-content']
  //   })
  // })

  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })

  it('id', () => {
    expect(wrapper.vm.$props.id).toStrictEqual(propsData.id)
    expect(typeof wrapper.vm.$props.id).toBe('number')
    expect(wrapper.vm.$options.props.id.required).toBeTruthy()
  })
})

describe('v-on', () => {
  const spotlight = jest.fn()
  const panTo = jest.fn()

  beforeEach(() => {
    $route = {
      name: 'search'
    }

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      mocks: {
        $route
      },
      methods: {
        spotlight,
        panTo
      },
      stubs: ['card-frame-content']
    })
  })

  it('spotlight, panTo', () => {
    wrapper.find('.v-card').trigger('click')
    expect(spotlight).toHaveBeenCalledTimes(1)
    expect(panTo).toHaveBeenCalledTimes(1)
  })
})

describe('methods', () => {
  it('spot/spotlight', () => {
    $route = {
      name: 'search'
    }

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      mocks: {
        $route
      },
      stubs: ['card-frame-content']
    })

    wrapper.vm.spotlight()
    expect(spot.actions.spotlight).toHaveBeenCalled()
  })

  it('user/spotlight', () => {
    $route = {
      name: 'profile'
    }

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      mocks: {
        $route
      },
      stubs: ['card-frame-content']
    })

    wrapper.vm.spotlight()
    expect(user.actions.spotlight).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('CardFrameContent has :spot', () => {
    expect(wrapper.find(CardFrameContent).props().spot).toMatchObject(
      propsData.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
