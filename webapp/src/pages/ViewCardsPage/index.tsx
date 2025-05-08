import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const ViewCardsPage = () => {
  const { cardNick } = useParams() as { cardNick: string }

  const { data, error, isLoading, isFetching, isError } = trpc.getCard.useQuery({
    cardNick,
  })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data?.card) {
    return <span>Card not found</span>
  }

  return (
    <Segment title={data.card.name} description={data.card.description}>
      <div className={css.createdAt}>Created At: {format(data.card.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.author}>Author: {data.card.author.nick}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.card.text }} />
    </Segment>
  )
}
