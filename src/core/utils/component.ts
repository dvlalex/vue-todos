import Vue, { Component, ComponentOptions } from 'vue'
import RequireContext = __WebpackModuleApi.RequireContext

/**
 * Register components
 * @param context
 */
export const registerComponents = async (context: RequireContext) => {
  return Promise.all(
    context
      .keys()
      .map(async (file) =>
        Vue.component(`C${file.replace(/^\.\//, '').replace(/\.\w+$/, '')}`, (await context(file)).default)
      )
  )
}

/**
 * Bootstrap component
 * @param options
 */
export const createComponent = (options: ComponentOptions<Vue>): Component => {
  return Vue.extend(options)
}
