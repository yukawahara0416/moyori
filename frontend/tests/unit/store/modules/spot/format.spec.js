import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import format from '@/store/modules/spot/format.js'
import { cloneDeep } from 'lodash'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(format))
})

describe('actions', () => {
  it('newSpotFormat', async () => {
    const response = {
      business_status: 'OPERATIONAL',
      icon:
        'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
      id: '931c7c062886f27d2fb7f409d9f91bfcfa23163f',
      name: 'olio オーリオ',
      opening_hours: {
        open_now: false
      },
      place_id: 'ChIJLRI5_WCTQTURdkM95d_L7gw',
      plus_code: {
        compound_code: 'H8CJ+6J 福岡県福岡市',
        global_code: '8Q5GH8CJ+6J'
      },
      price_level: 2,
      rating: 4,
      reference: 'ChIJLRI5_WCTQTURdkM95d_L7gw',
      scope: 'GOOGLE',
      types: [
        'cafe',
        'restaurant',
        'food',
        'point_of_interest',
        'store',
        'establishment'
      ],
      user_ratings_total: 53,
      vicinity: '福岡市早良区小田部５丁目１−１４'
    }

    const formatted = {
      marker: {
        address: '福岡市早良区小田部５丁目１−１４',
        image: '',
        name: 'olio オーリオ',
        on: false,
        place_id: 'ChIJLRI5_WCTQTURdkM95d_L7gw',
        position: { lat: null, lng: null },
        zIndex: 10
      },
      detail: {},
      data: {},
      likes: [],
      wifi_withs: [],
      wifi_withouts: [],
      power_withs: [],
      power_withouts: [],
      comments: []
    }

    const result = await store.dispatch('newSpotFormat', response)
    expect(result).toEqual(formatted)
  })

  // DBからGETしたスポット関連のJSONを整形しています
  it('postedSpotFormat', async () => {
    const response = {
      data: {
        id: 17,
        place_id: '1_fksv3yqm',
        name: 'test',
        address: '〒814-0032 福岡県福岡市早良区小田部１丁目２０−１',
        lat: '33.569922',
        lng: '130.333353',
        image: null,
        url: '',
        user_id: 1,
        created_at: '2020-07-06T22:14:19.000Z',
        updated_at: '2020-07-06T22:14:19.000Z',
        distance: 0.20295257253305587
      },
      marker: {
        address: '〒814-0032 福岡県福岡市早良区小田部１丁目２０−１',
        image: null,
        name: 'test',
        on: false,
        place_id: '1_fksv3yqm',
        position: { lat: '33.569922', lng: '130.333353' },
        zIndex: 10
      },
      likes: [],
      wifi_withs: [],
      wifi_withouts: [],
      power_withs: [],
      power_withouts: [],
      comments: []
    }

    const formatted = {
      data: {
        id: 17,
        place_id: '1_fksv3yqm',
        name: 'test',
        address: '〒814-0032 福岡県福岡市早良区小田部１丁目２０−１',
        lat: '33.569922',
        lng: '130.333353',
        image: null,
        url: '',
        user_id: 1,
        created_at: '2020-07-06T22:14:19.000Z',
        updated_at: '2020-07-06T22:14:19.000Z',
        distance: 0.20295257253305587
      },
      marker: {
        address: '〒814-0032 福岡県福岡市早良区小田部１丁目２０−１',
        name: 'test',
        on: false,
        image: null,
        place_id: '1_fksv3yqm',
        position: { lat: 33.569922, lng: 130.333353 },
        zIndex: 10
      },
      detail: {},
      likes: [],
      wifi_withs: [],
      wifi_withouts: [],
      power_withs: [],
      power_withouts: [],
      comments: []
    }

    const result = await store.dispatch('postedSpotFormat', response)
    expect(result).toEqual(formatted)
  })
})
