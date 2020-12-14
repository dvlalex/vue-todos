import Vue, { Component } from 'vue'
import { registerComponents } from '@/core/utils/component'

declare module 'vue/types/vue' {
  interface Vue {
    $events: Vue
    $icons: Record<string, string>
  }
}

/**
 * Bootstrap app
 */
export const createApp = async (config?: {
  layout: () => Promise<{ default: Component }>
  options?: Record<string, unknown>
  mount?: boolean
}): Promise<Vue> => {
  if (config === undefined) throw new Error('App config not available')

  Vue.prototype.$events = new Vue()
  Vue.prototype.$icons = {
    pencil:
      'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z',
  }
  await registerComponents(require('@/core/components/_loader').components())
  const template = await config.layout()

  const instance = new Vue({
    ...config.options,
    render: (h) => h(template.default),
  })
  return config.mount ? instance.$mount('#app') : instance
}
