import { trpc } from '../../lib/trpc.js'
import { zUpdateCardTrpcInput } from './input.js'

export const updateCardTrpcRoute = trpc.procedure.input(zUpdateCardTrpcInput).mutation(async ({ ctx, input }) => {
  const { cardId, ...cardInput } = input
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  const card = await ctx.prisma.card.findUnique({
    where: {
      id: cardId,
    },
  })
  if (!card) {
    throw new Error('NOT_FOUND')
  }
  if (ctx.me.id !== card.authorId) {
    throw new Error('NOT_YOUR_CARD')
  }
  if (card.nick !== input.nick) {
    const exCard = await ctx.prisma.card.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (exCard) {
      throw new Error('Card with this nick already exists')
    }
  }
  await ctx.prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      ...cardInput,
    },
  })
  return true
})
