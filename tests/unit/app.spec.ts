import { createApp, createComponent } from '@/core/utils/bootstrap'
import Vue from 'vue'

describe('App entry-point', () => {
  test('should throw error', async () => {
    await expect(createApp()).rejects.toThrow('App config not available')
  })

  test('should bootstrap a app', async () => {
    jest.mock('@/core/utils/component-loader', () => ({
      components: () => ({ keys: () => [] }),
    }))

    const mockLayout = jest.fn()
    const app = await createApp({ layout: mockLayout })

    expect(app).toBeInstanceOf(Vue)
    expect(mockLayout.mock.calls.length).toBe(1)
  })

  test('should bootstrap a component', async () => {
    const app = await createComponent({})

    expect(app.name).toEqual('VueComponent')
  })
})
