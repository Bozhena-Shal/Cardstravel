import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { getEditCardRoute, type ViewCardRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewCardsPage = () => {
  const { cardNick } = useParams() as ViewCardRouteParams

  const getCardResult = trpc.getCard.useQuery({
    cardNick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getCardResult.isLoading || getCardResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getCardResult.isError) {
    return <span>Error: {getCardResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getCardResult.data?.card) {
    return <span>Card not found</span>
  }

  const card = getCardResult.data.card
  const me = getMeResult.data?.me

  return (
    <Segment title={card.name} description={card.description}>
      <div className={css.createdAt}>Created At: {format(card.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {card.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: card.text }} />
      {me?.id === card.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditCardRoute({ cardNick: card.nick })}>Edit Card</LinkButton>
        </div>
      )}
    </Segment>
  )
}
