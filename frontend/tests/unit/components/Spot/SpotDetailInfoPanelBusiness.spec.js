import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailInfoPanelBusiness.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({
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
    })
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('computed', () => {
  it('businessDays', () => {
    const return_text =
      '月/ 10:00～19:30、火/ 10:00～19:30、水/ 10:00～19:30、木/ 10:00～19:30、金/ 10:00～19:30、土/ 10:00～19:30、日/ 10:00～19:30'

    expect(wrapper.vm.businessDays).toEqual(return_text)
  })

  it('isAboveLimit is true', () => {
    expect(wrapper.vm.isAboveLimit).toBeTruthy()
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

    expect(wrapper.vm.isAboveLimit).toBeFalsy()
  })

  it('readMore is true', () => {
    expect(wrapper.vm.readMore).toBeTruthy()
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

    expect(wrapper.vm.readMore).toBeFalsy()
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

describe('methods', () => {
  it('activateReadMore', () => {
    wrapper.vm.activateReadMore()
    expect(wrapper.vm.readMoreToggle).toBeTruthy()
  })
})

describe('template', () => {
  it('v-if="spot.data.opening_hours" is false', () => {
    propsData = {
      spot: { data: { id: 1 } }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    const target = wrapper.find('.mx-3')
    expect(target.exists()).toBeFalsy()
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('v-if="readMore is true {{ businessDays.slice(0, maxChar) }}', () => {
    expect(wrapper.find('.mx-3').text()).toContain(
      '月/ 10:00～19:30、火/ 10:00～19:30、'
    )
  })

  it('v-if="readMore is true ...続きをよむ', () => {
    expect(wrapper.find('.mx-3').text()).toContain('...続きをよむ')
  })

  it('v-if="readMore is false {{ businessDays }}', () => {
    propsData = {
      spot: {
        data: {
          id: 1,
          opening_hours: {
            weekday_text: ['月曜日: 10時00分～19時30分']
          }
        }
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.find('.mx-3').text()).toContain('月/ 10:00～19:30')
    expect(wrapper.find('.mx-3').text()).not.toContain('...続きをよむ')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
