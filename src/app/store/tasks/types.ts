import { ITask } from '@/core/types'

/**
 * Tasks state accessor
 */
export type TasksState = {
  Tasks: Map<string, ITask<string>>
}

/**
 * Tasks action types
 */
export const TaskActions = Object.freeze({
  GET_TASKS: 'GET_TASKS',
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
})
