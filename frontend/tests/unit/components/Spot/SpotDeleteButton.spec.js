import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDeleteButton.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1 }
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

describe('v-on', () => {
  it('click openDialog', () => {
    const openDialog = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      methods: {
        openDialog
      },
      stubs: ['spot-delete-button-dialog']
    })

    wrapper.find('.v-btn').trigger('click')
    expect(openDialog).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('openDialog', async () => {
    await wrapper.setData({ dialog: false })

    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBeTruthy()
  })

  it('closeDeleteDialog', async () => {
    await wrapper.setData({ dialog: true })

    wrapper.vm.closeDeleteDialog()
    expect(wrapper.vm.dialog).toBeFalsy()
  })
})

describe('emit', () => {
  it('closeDeleteDialog', () => {
    wrapper.vm.$emit('closeDeleteDialog')
    expect(wrapper.emitted().closeDeleteDialog).toBeTruthy()
  })

  it('closeDetailDialog', () => {
    wrapper.vm.$emit('closeDetailDialog')
    expect(wrapper.emitted().closeDetailDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('SpotDeleteButtonDialog has :spot', () => {})

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
