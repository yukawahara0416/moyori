import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import LikeButton from '@/components/LikeButton.vue'
import spotStore from '@/store/modules/spot.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let propsData
let store
let actions
let vuetify

beforeEach(() => {
  propsData = {
    spot: { record: { id: 1 } }
  }

  actions = {
    like: jest.fn(),
    unlike: jest.fn()
  }

  store = new Vuex.Store({
    modules: {
      likeStore: {
        actions
      },
      spotStore: {
        getters: spotStore.getters
      }
    }
  })

  vuetify = new Vuetify()

  wrapper = mount(LikeButton, {
    localVue,
    propsData,
    store,
    vuetify
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

describe('v-on', () => {
  it('likeHandler', () => {
    const event = jest.fn()
    wrapper.setMethods({ likeHandler: event })
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

// describe('actions', () => {
//   it('like', () => {
//     wrapper.vm.like()
//     expect(actions.like).toHaveBeenCalled()
//   })

//   it('unlike', () => {
//     wrapper.vm.unlike()
//     expect(actions.unlike).toHaveBeenCalled()
//   })
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
