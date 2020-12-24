import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Search/SearchFilterRadius.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
