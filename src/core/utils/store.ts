import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

/**
 * Bootstrap store
 */
export const createStore = <T>(options: StoreOptions<T>) => {
  Vue.use(Vuex)
  return new Vuex.Store(options)
}
