import { TaskInput, ITask, Service } from '@/core/types'
import { Task } from '@/app/models/task'

/**
 * Tasks service layer
 */
export class TaskService<T extends string, U extends ITask<T>> implements Service<T, U> {
  private readonly _tasks: Array<U>

  constructor(seed?: Array<U>) {
    this._tasks = seed || []
  }

  get Store() {
    return this._tasks
  }

  /**
   * Create & persist a new task for a given card
   * @param input
   * @param cardId
   */
  create(input: TaskInput<T>, cardId?: T): U {
    if (cardId === undefined) throw new Error('Card id not specified')
    const card = <U>new Task(input, cardId)
    this._tasks.push(card)
    return card
  }

  /**
   * Removes a task by id
   * @param id
   */
  delete(id: T): void {
    const taskIndex = this._tasks.findIndex((t) => t.id === id)
    if (taskIndex === -1) return

    this._tasks.splice(taskIndex, 1)
  }

  /**
   * Retrieve all tasks by card id
   */
  getAll(cardId?: T): Array<U> {
    if (cardId === undefined) throw new Error('Card id not specified')
    return this._tasks.filter((t) => t.card === cardId)
  }

  /**
   * Retrieve task by id
   * @param id
   */
  getById(id: T): U | undefined {
    return this._tasks.find((t) => t.id === id)
  }

  /**
   * Update task by id
   * @param id
   * @param input
   */
  update(id: T, input: TaskInput<T>): U | undefined {
    const task = this.getById(id)
    if (!task) return undefined

    return <U>task.update(input)
  }
}
