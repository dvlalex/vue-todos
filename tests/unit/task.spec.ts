import { ICard, ITask, ITaskService, TaskInput } from '@/core/types'
import { Card } from '@/app/models/card'
import { Task } from '@/app/models/task'
import { TaskService } from '@/app/services/taskService'

describe('app/models/task', <T extends string>() => {
  let card: ICard<T>
  let task: ITask<T>
  let input: TaskInput<T>

  beforeAll(() => {
    input = { title: 'Test Task', completed: false }
    card = new Card<T>({ title: 'Card Test' })
    task = new Task<T>(input, card.id)
  })

  test('should construct a task', () => {
    expect(task).toBeInstanceOf(Task)
    expect(task.title).toEqual(input.title)
  })

  test('task should change its title', () => {
    const title = 'New Task Name'
    task.update({ title })

    expect(task.title).toEqual(title)
  })
})

describe('app/services/task', <T extends string>() => {
  let service: ITaskService<T>
  let card: ICard<T>
  let task: ITask<T>

  beforeAll(() => {
    card = new Card<T>({ title: 'Card Test' })
  })

  test('should return its name', () => {
    const name = TaskService.Name

    expect(typeof name).toBe('string')
    expect(name).toEqual('TaskService')
  })

  test('should initiate service with empty seed', () => {
    const emptyService = new TaskService()

    expect(emptyService.Store.length).toEqual(0)
  })

  test('should initiate service with seed', () => {
    service = new TaskService([
      new Task<T>({ title: 'Task 1' }, card.id),
      new Task<T>({ title: 'Task 2' }, card.id),
      new Task<T>({ title: 'Task 3' }, card.id),
    ])

    expect(service.Store.length).toEqual(3)
  })

  test('should create a new task', () => {
    task = service.create({ title: 'Special Title' }, card.id)

    expect(service.Store.length).toEqual(4)
    expect(task.id).not.toBeUndefined()
    expect(task).toBeInstanceOf(Task)
  })

  test('should throw error', () => {
    expect(() => {
      service.getAll()
    }).toThrow('Card id not specified')
  })

  test('should get all tasks', () => {
    const tasks = service.getAll(card.id)

    expect(tasks.length).toEqual(4)
    tasks.map((c) => expect(c).toBeInstanceOf(Task))
  })

  test('should get a task by id', () => {
    const retrievedCard = service.getById(task.id)

    expect(retrievedCard).not.toBeUndefined()
    expect(retrievedCard).toBeInstanceOf(Task)
    expect(retrievedCard).toEqual(task)
  })

  test('should update a task by id', () => {
    const updatedTask = service.update(task.id, { title: 'New special Title' })
    const retrievedTask = service.getById(task.id)

    const testTask = (taskToBeTested: ITask<T> | undefined) => {
      expect(taskToBeTested).not.toBeUndefined()
      expect(taskToBeTested).toBeInstanceOf(Task)
      expect(taskToBeTested?.title).toEqual('New special Title')
    }

    testTask(updatedTask)
    testTask(retrievedTask)
  })

  test('should delete a task', () => {
    service.delete(task.id)

    expect(service.Store.length).toEqual(3)
  })

  test('should return undefined', () => {
    const deletedTask = service.delete(task.id)
    const updatedTask = service.update(task.id, { title: 'New special Title' })

    expect(deletedTask).toBeUndefined()
    expect(updatedTask).toBeUndefined()
  })
})
