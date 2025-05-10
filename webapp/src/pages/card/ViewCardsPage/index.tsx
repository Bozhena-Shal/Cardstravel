import type { TrpcRouterOutput } from '@cardstravel/backend/src/router'
import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../../components/Button/index'
import { Segment } from '../../../components/Segment'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditCardRoute, type ViewCardRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

const LikeButton = ({ card }: { card: NonNullable<TrpcRouterOutput['getCard']['card']> }) => {
  const trpcUtils = trpc.useUtils()
  const setCardLike = trpc.setCardLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetCardData = trpcUtils.getCard.getData({ cardNick: card.nick })
      if (oldGetCardData?.card) {
        const newGetCardData = {
          ...oldGetCardData,
          card: {
            ...oldGetCardData.card,
            isLikedByMe,
            likesCount: oldGetCardData.card.likesCount + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getCard.setData({ cardNick: card.nick }, newGetCardData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getCard.invalidate({ cardNick: card.nick })
    },
  })
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setCardLike.mutateAsync({ cardId: card.id, isLikedByMe: !card.isLikedByMe })
      }}
    >
      {card.isLikedByMe ? 'Unlike' : 'Like'}
    </button>
  )
}
export const ViewCardPage = withPageWrapper({
  useQuery: () => {
    const { cardNick } = useParams() as ViewCardRouteParams
    return trpc.getCard.useQuery({
      cardNick,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    card: checkExists(queryResult.data.card, 'Card not found'),

    me: ctx.me,
  }),
  showLoaderOnFetching: false,
})(({ card, me }) => (
  <Segment title={card.name} description={card.description}>
    <div className={css.createdAt}>Created At: {format(card.createdAt, 'yyyy-MM-dd')}</div>
    <div className={css.author}>Author: {card.author.nick}</div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: card.text }} />
    <div className={css.likes}>
      Likes: {card.likesCount}
      {me && (
        <>
          <br />
          <LikeButton card={card} />
        </>
      )}
    </div>
    {me?.id === card.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditCardRoute({ cardNick: card.nick })}>Edit Card</LinkButton>
      </div>
    )}
  </Segment>
))
