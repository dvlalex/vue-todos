import { CardInput } from '@/core/types/card'
import { TaskInput } from '@/core/types/task'

export interface Service<T, U> {
  create: (input: CardInput<T> | TaskInput<T>, parentId?: T) => U
  delete: (id: T) => void
  getAll: (parentId?: T) => Array<U>
  getById: (id: T) => U | undefined
  update: (id: T, input: CardInput<T> | TaskInput<T>) => U | undefined
  Store: Array<U>
}
