import { trpc } from '../../../lib/trpc.js'
import { zSetCardLikeCardTrpcInput } from './input.js'

export const setCardLikeTrpcRoute = trpc.procedure.input(zSetCardLikeCardTrpcInput).mutation(async ({ ctx, input }) => {
  const { cardId, isLikedByMe } = input
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
  if (isLikedByMe) {
    await ctx.prisma.cardLike.upsert({
      where: {
        cardId_userId: {
          cardId,
          userId: ctx.me.id,
        },
      },
      create: {
        userId: ctx.me.id,
        cardId,
      },
      update: {},
    })
  } else {
    await ctx.prisma.cardLike.delete({
      where: {
        cardId_userId: {
          cardId,
          userId: ctx.me.id,
        },
      },
    })
  }
  const likesCount = await ctx.prisma.cardLike.count({
    where: {
      cardId,
    },
  })
  return {
    card: {
      id: card.id,
      likesCount,
      isLikedByMe,
    },
  }
})
