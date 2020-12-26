import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailCommentPanel.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1 }, comments: [{ data: { id: 1 } }] }
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

describe('template', () => {
  it('v-if="spot.comments[0]', () => {
    expect(wrapper.find('comment-index-stub').exists()).toBe(true)
  })

  it('v-else', () => {
    propsData = {
      spot: { data: { id: 1 }, comments: [] }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.find('p').text()).toBe('コメントはまだありません')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('comment-post-dialog has :spot', () => {
    expect(wrapper.find('comment-post-dialog-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('comment-index has :spot', () => {
    expect(wrapper.find('comment-index-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
