import { z } from 'zod'
import { trpc } from '../../lib/trpc.js'

export const getCardTrpcRoute = trpc.procedure
  .input(
    z.object({
      cardNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const card = await ctx.prisma.card.findUnique({
      where: {
        nick: input.cardNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    })

    if (!card) {
      throw new Error('Card not found')
    }

    return { card }
  })
