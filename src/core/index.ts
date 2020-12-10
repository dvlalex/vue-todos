import Vue from 'vue'
export * from '@/core/utils/app'
export * from '@/core/utils/component'
// export * from '@/core/utils/store'

/**
 * Vue config
 */
const isProd = process.env.NODE_ENV !== 'development'
Vue.config.silent = isProd
Vue.config.productionTip = !isProd
Vue.config.performance = !isProd
Vue.config.devtools = !isProd
