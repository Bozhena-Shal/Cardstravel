import type { Card, User, UserPermission } from '@prisma/client'

type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeCard = Pick<Card, 'authorId'> | null

const hasPermission = (user: MaybeUser, permission: UserPermission) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockCards = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_CARDS')
}

export const canEditCard = (user: MaybeUser, card: MaybeCard) => {
  return !!user && !!card && user?.id === card?.authorId
}
