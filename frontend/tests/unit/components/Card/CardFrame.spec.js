import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
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
    spot: new Spot({ data: { id: 1 } }),
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
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
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
      methods: {
        spotlight,
        panTo
      },
      stubs: ['card-frame-content']
    })
  })

  it('spotlight, panTo', () => {
    wrapper.find('.v-card').trigger('click')
    expect(spotlight).toHaveBeenCalledWith(wrapper.vm.$props.spot.data.place_id)
    expect(panTo).toHaveBeenCalledWith(wrapper.vm.$props.spot.data.position)
  })
})

describe('methods', () => {
  let place_id

  beforeEach(() => {
    place_id = propsData.spot.data.place_id
  })

  it('spot/spotlight route is search', () => {
    wrapper.vm.$route.name = 'search'

    expect.assertions(1)

    wrapper.vm.spotlight(place_id)
    expect(spot.actions.spotlight).toHaveBeenCalledWith(
      expect.any(Object),
      place_id
    )
  })

  it('user/spotlight route is profile', () => {
    wrapper.vm.$route.name = 'profile'

    expect.assertions(1)

    wrapper.vm.spotlight(place_id)
    expect(user.actions.spotlight).toHaveBeenCalledWith(expect.any(Object), {
      place_id,
      tab: tab.getters.profileTab()
    })
  })
})

describe('template', () => {
  it('CardFrameContent has :spot', () => {
    expect(wrapper.find(CardFrameContent).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
