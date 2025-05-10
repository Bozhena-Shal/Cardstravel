import { z } from 'zod'

export const zSetCardLikeCardTrpcInput = z.object({
  cardId: z.string().min(1),
  isLikedByMe: z.boolean(),
})
