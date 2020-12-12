import { CardInput, ICard } from '@/core/types/card'
import { ITask, TaskInput } from '@/core/types/task'

interface BaseService<T, U> {
  delete: (id: T) => void
  getAll: (parentId?: T) => Array<U>
  getById: (id: T) => U | undefined
  Store: Array<U>
}

export interface ICardService<T> extends BaseService<T, ICard<T>> {
  create: (input: CardInput<T>) => ICard<T>
  update: (id: T, input: CardInput<T>) => ICard<T> | undefined
}

export interface ITaskService<T> extends BaseService<T, ITask<T>> {
  create: (input: TaskInput<T>, parentId: T) => ITask<T>
  update: (id: T, input: TaskInput<T>) => ITask<T> | undefined
}
