import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailInfoPanel.vue'
import SpotDetailInfoPanelAddress from '@/components/Spot/SpotDetailInfoPanelAddress.vue'
import SpotDetailInfoPanelPhone from '@/components/Spot/SpotDetailInfoPanelPhone.vue'
import SpotDetailInfoPanelWebsite from '@/components/Spot/SpotDetailInfoPanelWebsite.vue'
import SpotDetailInfoPanelBusiness from '@/components/Spot/SpotDetailInfoPanelBusiness.vue'
import SpotEditDialog from '@/components/Spot/SpotEditDialog.vue'
import SpotDeleteButton from '@/components/Spot/SpotDeleteButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

const dbSpot = {
  data: { id: 1, place_id: 'aaaaaaaaaa', user_id: 1 }
}

const dbSpotOthers = {
  data: { id: 1, place_id: 'aaaaaaaaaa', user_id: 2 }
}

const gmapSpot = {
  data: { id: 1, place_id: 'aaaaaaaaaaxx', user_id: 1 }
}

beforeEach(() => {
  propsData = {
    spot: new Spot(dbSpot)
  }

  auth = {
    getters: {
      currentUser: () => {
        return { data: { id: 1 } }
      },
      isLoggingIn: () => true
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
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
  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toMatchObject(store.getters.currentUser)
  })

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('computed', () => {
  describe('isOwnPosted', () => {
    it('isLoggingIn is false', () => {
      auth.getters.isLoggingIn = () => false

      store = new Vuex.Store({
        modules: {
          auth
        }
      })

      wrapper = shallowMount(Component, {
        localVue,
        propsData,
        store
      })

      expect(!wrapper.vm.isLoggingIn).toBeTruthy()
      expect(wrapper.vm.isOwnPosted).toBeFalsy()
    })

    it('spot.data.place_id.length > 11', async () => {
      await wrapper.setProps({ spot: new Spot(gmapSpot) })

      expect(wrapper.vm.$props.spot.data.place_id.length >= 11).toBeTruthy()
      expect(wrapper.vm.isOwnPosted).toBeFalsy()
    })

    it('return true spotOwner === currentUser', () => {
      expect(wrapper.vm.isOwnPosted).toBeTruthy()
    })

    it('return false spotOwner === currentUser', async () => {
      await wrapper.setProps({ spot: new Spot(dbSpotOthers) })

      expect(wrapper.vm.isOwnPosted).toBeFalsy()
      expect(wrapper.vm.$el).toMatchSnapshot()
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
  it('SpotDetailInfoPanelAddress has :spot', () => {
    expect(wrapper.find(SpotDetailInfoPanelAddress).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('SpotDetailInfoPanelPhone has :spot', () => {
    expect(wrapper.find(SpotDetailInfoPanelPhone).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('SpotDetailInfoPanelWebsite has :spot', () => {
    expect(wrapper.find(SpotDetailInfoPanelWebsite).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('SpotDetailInfoPanelBusiness has :spot', () => {
    expect(
      wrapper.find(SpotDetailInfoPanelBusiness).props().spot
    ).toMatchObject(wrapper.vm.$props.spot)
  })

  it('SpotEditDialog has :spot', () => {
    expect(wrapper.find(SpotEditDialog).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })
  it('SpotDeleteButton has :spot', () => {
    expect(wrapper.find(SpotDeleteButton).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('v-if="isOwnPosted" is true', () => {
    expect(wrapper.find(SpotEditDialog).exists()).toBeTruthy()
    expect(wrapper.find(SpotDeleteButton).exists()).toBeTruthy()
  })

  it('v-if="isOwnPosted" is false', async () => {
    await wrapper.setProps({ spot: new Spot(gmapSpot) })

    expect(wrapper.find(SpotEditDialog).exists()).toBeFalsy()
    expect(wrapper.find(SpotDeleteButton).exists()).toBeFalsy()
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
