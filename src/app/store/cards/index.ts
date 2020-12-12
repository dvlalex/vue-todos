import { Module } from 'vuex'
import { CardsState } from '@/app/store/cards/types'
import { useActions } from '@/app/store/cards/actions'
import { useGetters } from '@/app/store/cards/getters'
import { useMutations } from '@/app/store/cards/mutations'

/**
 * Cards module
 */
export const cards: Module<CardsState, unknown> = {
  namespaced: true,
  state: {
    Cards: new Map(),
  },

  actions: useActions(),

  getters: useGetters(),

  mutations: useMutations(),
}
