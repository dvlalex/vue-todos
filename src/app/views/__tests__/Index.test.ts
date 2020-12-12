import { shallowMount } from '@vue/test-utils'
import Index from '@/app/views/Index'

describe('app/views/Index.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.text()).toMatch('TODOsTODOs app © 2020 ~ source code')
  })
})
