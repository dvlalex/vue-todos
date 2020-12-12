export interface ICard<T> {
  id: T
  title: string
  update: (input: CardInput<T>) => ICard<T>
}

export type CardInput<T> = Partial<Omit<ICard<T>, 'id' | 'update'>>
