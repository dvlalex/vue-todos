import Vue, { Component, ComponentOptions } from 'vue'
import RequireContext = __WebpackModuleApi.RequireContext

/**
 * Vue config
 */
const isProd = process.env.NODE_ENV !== 'development'
Vue.config.silent = isProd
Vue.config.productionTip = !isProd
Vue.config.performance = !isProd
Vue.config.devtools = !isProd

/**
 * Register components on current instance
 * @param context
 */
const registerComponents = async (context: RequireContext) => {
  return Promise.all(
    context
      .keys()
      .map(async (file) =>
        Vue.component(`C${file.replace(/^\.\//, '').replace(/\.\w+$/, '')}`, (await context(file)).default)
      )
  )
}

/**
 * Bootstrap app
 */
export const createApp = async (config: {
  layout: () => Promise<{ default: Component }>
  options: Record<string, unknown>
}): Promise<Vue> => {
  await registerComponents(require.context('@/core/components', true, /\.vue$/, 'lazy'))
  const template = await config.layout()

  return new Vue({
    ...config.options,
    render: (h) => h(template.default),
  }).$mount('#app')
}

/**
 * Bootstrap component
 * @param options
 */
export const createComponent = (options: ComponentOptions<Vue>): Component => {
  return Vue.extend(options)
}
