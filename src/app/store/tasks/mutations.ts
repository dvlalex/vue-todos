import { MutationTree } from 'vuex'
import { ITask } from '@/core/types'
import { TaskActions, TasksState } from '@/app/store/tasks/types'

export const useMutations = (): MutationTree<TasksState> => ({
  [TaskActions.GET_TASKS]: (state, tasks: Array<ITask<string>>) => {
    // state.Tasks = new Map(tasks.map((t) => [t.id, t]))
    state.Tasks = [...tasks]
  },

  [TaskActions.CREATE_TASK]: (state, task: ITask<string>) => {
    // state.Tasks.set(task.id, task)
    state.Tasks.push(task)
  },

  [TaskActions.DELETE_TASK]: (state, taskId: string) => {
    // state.Tasks.delete(taskId)
    state.Tasks.splice(
      state.Tasks.findIndex((t) => t.id === taskId),
      1
    )
  },

  [TaskActions.UPDATE_TASK]: (state, task: ITask<string>) => {
    // state.Tasks.set(task.id, task)
    state.Tasks[state.Tasks.findIndex((t) => t.id === task.id)] = task
  },
})
