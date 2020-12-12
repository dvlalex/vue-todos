import Vue from 'vue'
import RequireContext = __WebpackModuleApi.RequireContext
import { capitalize } from '@/core/utils'

/**
 * Register components
 * @param context
 */
export const registerComponents = async (context: RequireContext) => {
  return Promise.all(
    context
      .keys()
      .map(async (file) =>
        Vue.component(`C${capitalize(file.replace(/^\.\//, '').replace(/\.\w+$/, ''))}`, (await context(file)).default)
      )
  )
}
