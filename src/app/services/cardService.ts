import { CardInput, ICard, Service } from '@/core/types'
import { Card } from '@/app/models/card'

/**
 * Cards service layer
 */
export class CardService<T extends string, U extends ICard<T>> implements Service<T, U> {
  private readonly _cards: Array<U>

  constructor(seed?: Array<U>) {
    this._cards = seed || []
  }

  get Store() {
    return this._cards
  }

  /**
   * Create & persist a new card
   * @param input
   */
  create(input: CardInput<T>): U {
    const card = <U>new Card(input)
    this._cards.push(card)
    return card
  }

  /**
   * Removes a card by id
   * @param id
   */
  delete(id: T): void {
    const cardIndex = this._cards.findIndex((c) => c.id === id)
    if (cardIndex === -1) return

    this._cards.splice(cardIndex, 1)
  }

  /**
   * Retrieve all cards
   */
  getAll(): Array<U> {
    return this._cards
  }

  /**
   * Retrieve card by id
   * @param id
   */
  getById(id: T): U | undefined {
    return this._cards.find((c) => c.id === id)
  }

  /**
   * Update card by id
   * @param id
   * @param input
   */
  update(id: T, input: CardInput<T>): U | undefined {
    const card = this.getById(id)
    if (!card) return undefined

    return <U>card.update(input)
  }
}
