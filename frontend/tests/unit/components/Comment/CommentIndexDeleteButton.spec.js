import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexDeleteButton.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1 } },
    comment: { id: 1 }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Object).toBeTruthy()
  })

  it('comment', () => {
    expect(wrapper.vm.$props.comment).toStrictEqual(propsData.comment)
    expect(wrapper.vm.$props.comment instanceof Object).toBeTruthy()
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
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(openDialog).toHaveBeenCalled()
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('methods', () => {
  it('openDialog', () => {
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBeTruthy()
  })

  it('closeDialog', () => {
    wrapper.vm.dialog = true
    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).toBeFalsy()
  })
})

describe('template', () => {
  it('comment-index-delete-button-dialog has :spot :comment', () => {
    expect(
      wrapper.find('comment-index-delete-button-dialog-stub').attributes().spot
    ).toEqual('[object Object]')

    expect(
      wrapper.find('comment-index-delete-button-dialog-stub').attributes()
        .comment
    ).toEqual('[object Object]')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
