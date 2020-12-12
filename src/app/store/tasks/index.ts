import { Module } from 'vuex'
import { TasksState } from '@/app/store/tasks/types'
import { useActions } from '@/app/store/tasks/actions'
import { useGetters } from '@/app/store/tasks/getters'
import { useMutations } from '@/app/store/tasks/mutations'

/**
 * Tasks module
 */
export const tasks: Module<TasksState, unknown> = {
  namespaced: true,
  state: {
    Tasks: new Map(),
  },

  actions: useActions(),

  getters: useGetters(),

  mutations: useMutations(),
}
