import { z } from 'zod'
import { zCreateCardTrpcInput } from '../createCard/input.js'

export const zUpdateCardTrpcInput = zCreateCardTrpcInput.extend({
  cardId: z.string().min(1),
})
