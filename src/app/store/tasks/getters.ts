import { GetterTree } from 'vuex'
import { TaskActions, TasksState } from '@/app/store/tasks/types'

export const useGetters = <R>(): GetterTree<TasksState, R> => ({
  [TaskActions.GET_TASKS]: (state) => (cardId: string) => state.Tasks.filter((t) => t.card === cardId),
})
