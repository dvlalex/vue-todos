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
    tick: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
    trashcan: 'M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z',
  }
  await registerComponents(require('@/core/components/_loader').components())
  const template = await config.layout()

  const instance = new Vue({
    ...config.options,
    render: (h) => h(template.default),
  })
  return config.mount ? instance.$mount('#app') : instance
}
