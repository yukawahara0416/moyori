import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailCommentPanel.vue'
import CommentIndex from '@/components/Comment/CommentIndex.vue'
import CommentPostDialog from '@/components/Comment/CommentPostDialog.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({ data: { id: 1 }, comments: [{ data: { id: 1 } }] })
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

describe('template', () => {
  it('v-if="spot.comments[0]', () => {
    expect(wrapper.find('comment-index-stub').exists()).toBeTruthy()
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

  it('CommentPostDialog has :spot', () => {
    expect(wrapper.find(CommentPostDialog).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('CommentIndex has :spot', () => {
    expect(wrapper.find(CommentIndex).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
