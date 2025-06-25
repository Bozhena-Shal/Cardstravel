import { z } from 'zod'

export const zBlockCardTrpcInput = z.object({
  cardId: z.string().min(1),
})
