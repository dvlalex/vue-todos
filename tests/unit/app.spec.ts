import Vue from 'vue'
import { createApp } from '@/core'

describe('core/utils/app', () => {
  test('should throw error', async () => {
    await expect(createApp()).rejects.toThrow('App config not available')
  })

  test('should bootstrap a app', async () => {
    jest.mock('@/core/components/_loader', () => ({
      components: () => ({ keys: () => [] }),
    }))

    const mockLayout = jest.fn()
    const app = await createApp({ layout: mockLayout })

    expect(app).toBeInstanceOf(Vue)
    expect(mockLayout.mock.calls.length).toBe(1)
  })
})
