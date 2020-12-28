import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/CommentButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let options
let data
let auth

beforeEach(() => {
})
