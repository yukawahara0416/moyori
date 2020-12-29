import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Tutorial/TutorialDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let dialog

