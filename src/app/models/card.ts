import { CardInput, ICard } from '@/core/types'
import { nanoid } from 'nanoid'

/**
 * Card model class
 */
export class Card<T> implements ICard<T> {
  id!: T
  title!: string

  constructor(input: CardInput<T>) {
    Object.assign(this, input, { id: nanoid() })
  }

  update(input: CardInput<T>) {
    Object.assign(this, input)
    return this
  }
}
