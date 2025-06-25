import _ from 'lodash'
import { z } from 'zod'
import { trpc } from '../../../lib/trpc.js'

export const getCardTrpcRoute = trpc.procedure
  .input(
    z.object({
      cardNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawCard = await ctx.prisma.card.findUnique({
      where: {
        nick: input.cardNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        cardsLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            cardsLikes: true,
          },
        },
      },
    })

    const isLikedByMe = !!rawCard?.cardsLikes.length
    const likesCount = rawCard?._count.cardsLikes || 0
    const card = rawCard && { ..._.omit(rawCard, ['cardsLikes', '_count']), isLikedByMe, likesCount }

    return { card }
  })
