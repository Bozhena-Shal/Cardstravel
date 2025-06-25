import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { trpc } from '../lib/trpc.js'
import { getMeTrpcRoute } from './auth/getMe/index.js'
import { signInTrpcRoute } from './auth/signIn/index.js'
import { signUpTrpcRoute } from './auth/signUp/index.js'
import { updatePasswordTrpcRoute } from './auth/updatePassword/index.js'
import { updateProfileTrpcRoute } from './auth/updateProfile/index.js'
import { createCardTrpcRoute } from './card/createCard/index.js'
import { getCardTrpcRoute } from './card/getCard/index.js'
import { getCardsTrpcRoute } from './card/getCards/index.js'
import { setCardLikeTrpcRoute } from './card/setCardLike/index.js'
import { updateCardTrpcRoute } from './card/updateCard/index.js'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  createCard: createCardTrpcRoute,
  setCardLike: setCardLikeTrpcRoute,
  getCard: getCardTrpcRoute,
  getCards: getCardsTrpcRoute,
  updateCard: updateCardTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
