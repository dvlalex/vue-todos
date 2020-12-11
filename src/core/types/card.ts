export interface ICard<T> {
  id: T
  title: string
  update: (input: CardInput<T>) => ICard<T>
}

export type CardInput<T> = Omit<ICard<T>, 'id' | 'update'>
