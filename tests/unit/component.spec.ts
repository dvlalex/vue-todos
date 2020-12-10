import { createComponent, registerComponents } from '@/core'

describe('core/utils/component', () => {
  test('should register components', async () => {
    const mockContext = jest.fn().mockReturnValue({ keys: () => [] })

    jest.mock('@/core/components/_loader', () => ({
      components: mockContext,
    }))

    await registerComponents(require('@/core/components/_loader').components())
    expect(mockContext.mock.calls.length).toBe(1)
  })

  test('should bootstrap a component', async () => {
    const app = await createComponent({})

    expect(app.name).toEqual('VueComponent')
  })
})
