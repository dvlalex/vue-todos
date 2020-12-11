export interface ITask<T> {
  id: T
  card: T
  title: string
  update: (input: TaskInput<T>) => ITask<T>
}

export type TaskInput<T> = Omit<ITask<T>, 'id' | 'card' | 'update'>
