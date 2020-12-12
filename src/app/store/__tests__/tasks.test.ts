import { createLocalVue } from '@vue/test-utils'
import Vuex, { ActionContext, ActionHandler, Module, Store } from 'vuex'
import { TaskActions, TasksState } from '@/app/store/tasks/types'
import { Task } from '@/app/models/task'

const Vue = createLocalVue()
Vue.use(Vuex)

const actionContext = (
  commit: () => void,
  dispatch: () => Promise<void> = async () => undefined
): ActionContext<TasksState, unknown> => ({
  commit,
  dispatch,
  state: { Tasks: [] },
  getters: {},
  rootState: {},
  rootGetters: {},
})

describe('/app/store/tasks', () => {
  let tasks: Module<TasksState, unknown>
  let state: TasksState
  let task: Task<string>
  let moduleStore: Store<unknown>

  beforeAll(async () => {
    jest.mock('@/core/utils/factory', () => ({
      Factory: {
        createInstance: () => ({
          getAll: () => [
            { id: 'a', card: 'aa', title: 'a', completed: false },
            { id: 'b', card: 'aa', title: 'b', completed: false },
          ],
          create: (input: Record<string, unknown>, cardId: string) => ({ ...input, card: cardId }),
          delete: () => null,
          update: (taskId: string, input: Record<string, unknown>) => ({ ...input, id: taskId }),
        }),
      },
    }))

    tasks = await import('@/app/store/tasks').then((i) => i.tasks)
    state = { Tasks: [] }
    moduleStore = new Vuex.Store({ modules: { tasks } })
  })

  test('getters ~ GET_TASKS', () => {
    const getters = tasks.getters?.[TaskActions.GET_TASKS]
    if (getters) {
      expect(getters({ Tasks: [] }, null, null, null)('card-id').length).toEqual(0)
    }
  })

  test('actions ~ GET_TASKS', async () => {
    expect.assertions(2)
    const commit = jest.fn()

    const getTasks = <ActionHandler<TasksState, unknown>>tasks.actions?.[TaskActions.GET_TASKS]
    if (getTasks) {
      await getTasks.bind(moduleStore)(actionContext(commit))

      expect(commit.mock.calls.length).toEqual(1)
      expect(commit).toBeCalledWith(TaskActions.GET_TASKS, [
        { id: 'a', card: 'aa', title: 'a', completed: false },
        { id: 'b', card: 'aa', title: 'b', completed: false },
      ])
    }
  })

  test('actions ~ CREATE_TASK', async () => {
    expect.assertions(2)
    const commit = jest.fn()

    const taskInput = { title: 'Card title', completed: true }
    const createTask = <ActionHandler<TasksState, unknown>>tasks.actions?.[TaskActions.CREATE_TASK]
    if (createTask) {
      await createTask.bind(moduleStore)(actionContext(commit), { taskInput, cardId: 'card-id' })

      expect(commit.mock.calls.length).toEqual(1)
      expect(commit).toBeCalledWith(TaskActions.CREATE_TASK, { ...taskInput, card: 'card-id' })
    }
  })

  test('actions ~ DELETE_TASK', async () => {
    expect.assertions(2)
    const commit = jest.fn()

    const taskId = 'random-id-task'
    const deleteTask = <ActionHandler<TasksState, unknown>>tasks.actions?.[TaskActions.DELETE_TASK]
    if (deleteTask) {
      await deleteTask.bind(moduleStore)(actionContext(commit), taskId)

      expect(commit.mock.calls.length).toEqual(1)
      expect(commit).toBeCalledWith(TaskActions.DELETE_TASK, taskId)
    }
  })

  test('actions ~ UPDATE_TASK', async () => {
    expect.assertions(2)
    const commit = jest.fn()

    const taskId = 'random-id-task'
    const taskInput = { title: 'Card title' }
    const updateTask = <ActionHandler<TasksState, unknown>>tasks.actions?.[TaskActions.UPDATE_TASK]
    if (updateTask) {
      await updateTask.bind(moduleStore)(actionContext(commit), { taskId, taskInput })

      expect(commit.mock.calls.length).toEqual(1)
      expect(commit).toBeCalledWith(TaskActions.UPDATE_TASK, { id: taskId, ...taskInput })
    }
  })

  test('mutations ~ GET_TASKS', () => {
    expect.assertions(2)
    const getTasks = tasks.mutations?.[TaskActions.GET_TASKS]
    if (getTasks) {
      task = new Task<string>({ title: 'Special Task', completed: true }, 'card-id')
      getTasks(state, [
        new Task<string>({ title: 'Card 1', completed: false }, 'card-id'),
        new Task<string>({ title: 'Card 2', completed: false }, 'card-id'),
        task,
        new Task<string>({ title: 'Card 3', completed: false }, 'card-id'),
      ])

      expect(state.Tasks.length).toEqual(4)
      expect(state.Tasks[2].id).toEqual(task.id)
      // expect(Array.from(state.Tasks.keys())[2]).toEqual(task.id)
    }
  })

  test('mutations ~ CREATE_TASK', () => {
    expect.assertions(2)
    const createTask = tasks.mutations?.[TaskActions.CREATE_TASK]
    if (createTask) {
      const newTask = new Task<string>({ title: 'Card 5', completed: false }, 'card-id')
      createTask(state, newTask)

      expect(state.Tasks.length).toEqual(5)
      expect(state.Tasks[4].id).toEqual(newTask.id)
      // expect(Array.from(state.Tasks.keys())[4]).toEqual(newTask.id)
    }
  })

  test('mutations ~ UPDATE_TASK', () => {
    expect.assertions(1)
    const updateTask = tasks.mutations?.[TaskActions.UPDATE_TASK]
    if (updateTask) {
      const updatedTask = { ...task, title: 'New special title' }
      updateTask(state, updatedTask)

      expect(state.Tasks.find((t) => t.id === task.id)).toEqual(updatedTask)
    }
  })

  test('mutations ~ DELETE_TASK', () => {
    expect.assertions(2)
    const deleteTask = tasks.mutations?.[TaskActions.DELETE_TASK]
    if (deleteTask) {
      deleteTask(state, task.id)

      expect(state.Tasks.length).toEqual(4)
      expect(Array.from(state.Tasks.keys())[2]).not.toEqual(task.id)
    }
  })
})
