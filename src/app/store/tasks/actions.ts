import { ActionTree } from 'vuex'
import { Factory } from '@/core/utils/factory'
import { TaskInput, ITaskService, ITask } from '@/core/types'
import { TaskService } from '@/app/services/taskService'
import { TaskActions, TasksState } from '@/app/store/tasks/types'

export const useActions = <R>(): ActionTree<TasksState, R> => ({
  [TaskActions.GET_TASKS]: async ({ commit }, cardId: string) => {
    const taskService = Factory.createInstance<ITaskService<string>>(TaskService)
    const tasks = taskService.getAll(cardId)
    commit(TaskActions.GET_TASKS, tasks)
  },

  [TaskActions.CREATE_TASK]: async (
    { commit },
    payload: { cardId: string; taskInput: TaskInput<string> }
  ): Promise<ITask<string>> => {
    const taskService = Factory.createInstance<ITaskService<string>>(TaskService)
    const task = taskService.create(payload.taskInput, payload.cardId)

    commit(TaskActions.CREATE_TASK, task)
    return task
  },

  [TaskActions.DELETE_TASK]: async ({ commit }, taskId: string) => {
    const taskService = Factory.createInstance<ITaskService<string>>(TaskService)
    taskService.delete(taskId)

    commit(TaskActions.DELETE_TASK, taskId)
  },

  [TaskActions.UPDATE_TASK]: async ({ commit }, payload: { taskId: string; taskInput: TaskInput<string> }) => {
    const taskService = Factory.createInstance<ITaskService<string>>(TaskService)
    const task = taskService.update(payload.taskId, payload.taskInput)

    commit(TaskActions.UPDATE_TASK, task)
  },
})
