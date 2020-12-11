import { ITask, TaskInput } from '@/core/types'
import { nanoid } from 'nanoid'

/**
 * Task model class
 */
export class Task<T> implements ITask<T> {
  id!: T
  card!: T
  title!: string

  constructor(input: TaskInput<T>, card: string) {
    Object.assign(this, input, { card, id: nanoid() })
  }

  update(input: TaskInput<T>) {
    Object.assign(this, input)
    return this
  }
}
