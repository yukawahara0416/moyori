import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import Component from '@/components/Spot/SpotDeleteButtonDialog.vue'

const localVue = createLocalVue()
const axiosMock = new MockAdapter(axiosBase)

let wrapper

describe('props', () => {
  it('spot', () => {})
})

describe('v-on', () => {
  it('click closeDeleteDialog', () => {})

  it('click deleteHandler', () => {})
})

describe('methods', () => {
  it('deleteHandler', () => {})
  it('deleteSpot', () => {})
  it('closeDeleteDialog', () => {})
  it('closeDetailDialog', () => {})
  it('storeMutation', () => {})
})
