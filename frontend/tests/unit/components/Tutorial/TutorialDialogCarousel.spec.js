import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Tutorial/TutorialDialogCarousel.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let store
let dialog
let vuetify

beforeEach(() => {
  dialog = {
    mutations: {
      dialogOff: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      dialog
    }
  })

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    store,
    vuetify
  })
})

describe('v-on', () => {
  it('click dialogOff', () => {
    wrapper = mount(Component, {
      localVue,
      store,
      vuetify
    })

    wrapper.find('.v-btn').trigger('click')
    expect(dialog.mutations.dialogOff).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogTutorial'
    )
  })
})

describe('template', () => {
  const slides = [
    {
      title: '集中できるスポットをシェアしよう！',
      content:
        '外出中に「近くにWi-Fiがあって充電もできるカフェがないかな？」と困ったことはありませんか？MoYoRiならすぐに見つけられます。',
      image: require('@/assets/cafe_nomad_man.png'),
      color: 'indigo'
    },
    {
      title: 'スポットに投票しよう！',
      content:
        '「Wifiサービスのあり／なし」「電源サービスのあり／なし」をワンクリックで投票することが出来ます。（＊ユーザ登録が必要です）',
      image: require('@/assets/card_sample.png'),
      color: 'pink darken-2'
    },
    {
      title: 'スポットを投稿しよう！',
      content:
        'マップをクリックするだけで、新しいスポットを投稿することができます。（＊ユーザ登録が必要です）',
      image: require('@/assets/click_sample.png'),
      color: 'red lighten-1'
    }
  ]

  it('v-sheet-stub has :color', () => {
    for (let i = 0; i < slides.length; i++) {
      expect(
        wrapper
          .findAll('v-sheet-stub')
          .at(i)
          .attributes().color
      ).toEqual(slides[i].color)
    }
  })

  it('div has :title', () => {
    for (let i = 0; i < slides.length; i++) {
      expect(
        wrapper
          .findAll('.headline')
          .at(i)
          .text()
      ).toEqual(slides[i].title)
    }
  })

  it('div has :content', () => {
    for (let i = 0; i < slides.length; i++) {
      expect(
        wrapper
          .findAll('.headline + div')
          .at(i)
          .text()
      ).toEqual(slides[i].content)
    }
  })

  it('v-if is true', () => {
    const mdAndUp = wrapper.vm.$vuetify.breakpoint.thresholds.md + 1
    Object.assign(window, { innerWidth: mdAndUp })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify
    })

    expect(wrapper.vm.$vuetify.breakpoint.mdAndUp).toBeTruthy()
    expect(wrapper.find('v-img-stub').exists()).toBeTruthy()

    Object.assign(window, { innerWidth: 1024 })
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
