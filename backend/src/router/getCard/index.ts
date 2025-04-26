import { z } from 'zod'
import { cards } from '../../lib/cards.js'
import { trpc } from '../../lib/trpc.js'

export const getCardTrpcRoute = trpc.procedure
  .input(
    z.object({
      cardNick: z.string(),
    })
  )
  .query(({ input }) => {
    const card = cards.find((card) => card.nick === input.cardNick)
    return { card: card || null }
  })
