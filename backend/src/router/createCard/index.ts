import { cards } from '../../lib/cards'
import { trpc } from '../../lib/trpc'
import { zCreateCardTrpcInput } from './input'

export const createCardTrpcRoute = trpc.procedure.input(zCreateCardTrpcInput).mutation(({ input }) => {
  if (cards.find((card) => card.nick === input.nick)) {
    throw Error('Card with this nick already exists')
  }
  cards.unshift(input)
  return true
})
