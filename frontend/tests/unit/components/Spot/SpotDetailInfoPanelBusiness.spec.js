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
  })
})
  })
  })
