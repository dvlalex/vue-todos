import { MutationTree } from 'vuex'
import { ITask } from '@/core/types'
import { TaskActions, TasksState } from '@/app/store/tasks/types'

export const useMutations = (): MutationTree<TasksState> => ({
  [TaskActions.GET_TASKS]: (state, tasks: Array<ITask<string>>) => {
    state.Tasks = new Map(tasks.map((t) => [t.id, t]))
  },

  [TaskActions.CREATE_TASK]: (state, task: ITask<string>) => {
    state.Tasks.set(task.id, task)
  },

  [TaskActions.DELETE_TASK]: (state, taskId: string) => {
    state.Tasks.delete(taskId)
  },

  [TaskActions.UPDATE_TASK]: (state, task: ITask<string>) => {
    state.Tasks.set(task.id, task)
  },
})
