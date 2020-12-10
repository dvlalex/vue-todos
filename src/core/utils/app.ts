import Vue, { Component } from 'vue'
import { registerComponents } from '@/core/utils/component'

/**
 * Bootstrap app
 */
export const createApp = async (config?: {
  layout: () => Promise<{ default: Component }>
  options?: Record<string, unknown>
  mount?: boolean
}): Promise<Vue> => {
  if (config === undefined) throw new Error('App config not available')

  await registerComponents(require('@/core/components/_loader').components())
  const template = await config.layout()

  const instance = new Vue({
    ...config.options,
    render: (h) => h(template.default),
  })
  return config.mount ? instance.$mount('#app') : instance
}
