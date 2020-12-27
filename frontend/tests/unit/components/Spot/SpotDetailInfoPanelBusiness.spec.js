import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailInfoPanelBusiness.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: {
        id: 1,
        opening_hours: {
          weekday_text: [
            '月曜日: 10時00分～19時30分',
            '火曜日: 10時00分～19時30分',
            '水曜日: 10時00分～19時30分',
            '木曜日: 10時00分～19時30分',
            '金曜日: 10時00分～19時30分',
            '土曜日: 10時00分～19時30分',
            '日曜日: 10時00分～19時30分'
          ]
        }
      }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})
describe('computed', () => {
  it('businessDays', () => {
    const return_text =
      '月/ 10:00～19:30、火/ 10:00～19:30、水/ 10:00～19:30、木/ 10:00～19:30、金/ 10:00～19:30、土/ 10:00～19:30、日/ 10:00～19:30'

    expect(wrapper.vm.businessDays).toEqual(return_text)
  })

  it('isAboveLimit is true', () => {
    expect(wrapper.vm.isAboveLimit).toBe(true)
  })

  it('isAboveLimit is false', () => {
    propsData = {
      spot: {
        data: {
          id: 1,
          opening_hours: {
            weekday_text: ['test']
          }
        }
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.isAboveLimit).toBe(false)
  })

  it('readMore is true', () => {
    expect(wrapper.vm.readMore).toBe(true)
  })

  it('readMore is false', () => {
    propsData = {
      spot: {
        data: {
          id: 1,
          opening_hours: {
            weekday_text: ['test']
          }
        }
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.readMore).toBe(false)
  })
})
describe('v-on', () => {
  it('activateReadMore', () => {
    const activateReadMore = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      methods: {
        activateReadMore
      }
    })

    wrapper.find('a').trigger('click')
    expect(activateReadMore).toHaveBeenCalled()
  })
})
  })
  })
