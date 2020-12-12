import { CardInput, ICard, ICardService } from '@/core/types'
import { Card } from '@/app/models/card'

/**
 * Cards service layer
 */
export class CardService<T extends string> implements ICardService<T> {
  private readonly _cards: Array<ICard<T>>

  static get Name(): string {
    return 'CardService'
  }

  constructor(seed?: Array<ICard<T>>) {
    this._cards = seed || []
  }

  get Store() {
    return this._cards
  }

  /**
   * Create & persist a new card
   * @param input
   */
  create(input: CardInput<T>): ICard<T> {
    const card = new Card(input)
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
  getAll(): Array<ICard<T>> {
    return this._cards
  }

  /**
   * Retrieve card by id
   * @param id
   */
  getById(id: T): ICard<T> | undefined {
    return this._cards.find((c) => c.id === id)
  }

  /**
   * Update card by id
   * @param id
   * @param input
   */
  update(id: T, input: CardInput<T>): ICard<T> | undefined {
    const card = this.getById(id)
    if (!card) return undefined

    return card.update(input)
  }
}
