export interface ITask<T> {
  id: T
  card: T
  title: string
  completed: boolean
  update: (input: TaskInput<T>) => ITask<T>
}

export type TaskInput<T> = Partial<Omit<ITask<T>, 'id' | 'card' | 'update'>>
