import { trpc } from '../../../lib/trpc.js'
import { canBlockCards } from '../../../utils/can.js'
import { zBlockCardTrpcInput } from './input.js'
export const blockCardTrpcRoute = trpc.procedure.input(zBlockCardTrpcInput).mutation(async ({ ctx, input }) => {
  const { cardId } = input
  if (!canBlockCards(ctx.me)) {
    throw new Error('PERMISSION_DENIED')
  }
  const card = await ctx.prisma.card.findUnique({
    where: {
      id: cardId,
    },
  })
  if (!card) {
    throw new Error('NOT_FOUND')
  }
  await ctx.prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      blockedAt: new Date(),
    },
  })
  return true
})
