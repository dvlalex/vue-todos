import { TaskInput, ITask, ITaskService } from '@/core/types'
import { Task } from '@/app/models/task'

/**
 * Tasks service layer
 */
export class TaskService<T extends string> implements ITaskService<T> {
  private readonly _tasks: Array<ITask<T>>

  static get Name(): string {
    return 'TaskService'
  }

  constructor(seed?: Array<ITask<T>>) {
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
  create(input: TaskInput<T>, cardId: T): ITask<T> {
    const card = <ITask<T>>new Task(input, cardId)
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
  getAll(cardId?: T): Array<ITask<T>> {
    if (cardId === undefined) throw new Error('Card id not specified')
    return this._tasks.filter((t) => t.card === cardId)
  }

  /**
   * Retrieve task by id
   * @param id
   */
  getById(id: T): ITask<T> | undefined {
    return this._tasks.find((t) => t.id === id)
  }

  /**
   * Update task by id
   * @param id
   * @param input
   */
  update(id: T, input: TaskInput<T>): ITask<T> | undefined {
    const task = this.getById(id)
    if (!task) return undefined

    return task.update(input)
  }
}
