import { createComponent, registerComponents } from '@/core'

describe('core/utils/component', () => {
  test('should register components', async () => {
    const mockFn = Object.assign(jest.fn().mockReturnValue({ default: undefined }), { keys: () => ['TestComponent'] })
    jest.mock('@/core/components/_loader', () => ({
      components: mockFn,
    }))

    await registerComponents(require('@/core/components/_loader').components)
    expect(mockFn).toBeCalledWith('TestComponent')
    expect(mockFn.mock.calls.length).toBe(1)
  })

  test('should bootstrap a component', async () => {
    const app = await createComponent({})

    expect(app.name).toEqual('VueComponent')
  })
})
