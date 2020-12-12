import { ICard } from '@/core/types'

/**
 * Cards state
 */
export type CardsState = {
  Cards: Map<string, ICard<string>>
}

/**
 * Cards action types
 */
export const CardActions = Object.freeze({
  GET_CARDS: 'GET_CARDS',
  CREATE_CARD: 'CREATE_CARD',
  UPDATE_CARD: 'UPDATE_CARD',
  DELETE_CARD: 'DELETE_CARD',
})
