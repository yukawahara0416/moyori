import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderDemoButton.vue'

const localVue = createLocalVue()

let wrapper

const demoSearch = jest.fn()
