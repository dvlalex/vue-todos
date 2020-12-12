import { Card } from '@/app/models/card'
import { CardService } from '@/app/services/cardService'
import { CardInput, ICard, ICardService } from '@/core/types'

describe('app/models/card', <T extends string>() => {
  let card: ICard<T>
  let input: CardInput<T>

  beforeAll(() => {
    input = { title: 'Card Test' }
    card = new Card<T>(input)
  })

  test('should construct a card', () => {
    expect(card).toBeInstanceOf(Card)
    expect(card.title).toEqual(input.title)
  })

  test('card should change its title', () => {
    const title = 'New Card Name'
    card.update({ title })

    expect(card.title).toEqual(title)
  })
})

describe('app/services/cards', <T extends string>() => {
  let service: ICardService<T>
  let card: ICard<T>

  test('should return its name', () => {
    const name = CardService.Name

    expect(typeof name).toBe('string')
    expect(name).toEqual('CardService')
  })

  test('should initiate service with empty seed', () => {
    const emptyService = new CardService()

    expect(emptyService.Store.length).toEqual(0)
  })

  test('should initiate service with seed', () => {
    service = new CardService([
      new Card({ title: 'Card 1' }),
      new Card({ title: 'Card 2' }),
      new Card({ title: 'Card 4' }),
    ])

    expect(service.Store.length).toEqual(3)
  })

  test('should create a new card', () => {
    card = service.create({ title: 'Special Title' })

    expect(service.Store.length).toEqual(4)
    expect(card.id).not.toBeUndefined()
    expect(card).toBeInstanceOf(Card)
  })

  test('should get all cards', () => {
    const cards = service.getAll()

    expect(cards.length).toEqual(4)
    cards.map((c) => expect(c).toBeInstanceOf(Card))
  })

  test('should get a card by id', () => {
    const retrievedCard = service.getById(card.id)

    expect(retrievedCard).not.toBeUndefined()
    expect(retrievedCard).toBeInstanceOf(Card)
    expect(retrievedCard).toEqual(card)
  })

  test('should update a card by id', () => {
    const updatedCard = service.update(card.id, { title: 'New special Title' })
    const retrievedCard = service.getById(card.id)

    const testCard = (cardToBeTested: ICard<T> | undefined) => {
      expect(cardToBeTested).not.toBeUndefined()
      expect(cardToBeTested).toBeInstanceOf(Card)
      expect(cardToBeTested?.title).toEqual('New special Title')
    }

    testCard(updatedCard)
    testCard(retrievedCard)
  })

  test('should delete a card', () => {
    service.delete(card.id)

    expect(service.Store.length).toEqual(3)
  })

  test('should return undefined', () => {
    const deletedCard = service.delete(card.id)
    const updatedCard = service.update(card.id, { title: 'New special Title' })

    expect(deletedCard).toBeUndefined()
    expect(updatedCard).toBeUndefined()
  })
})
