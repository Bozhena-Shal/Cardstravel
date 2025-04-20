import { Link } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { getViewCardsRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'

export const AllCardsPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getCards.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data) {
    return <span>No data available.</span>
  }

  return (
    <Segment title="All Cards">
      <div className={css.cards}>
        {data.cards.map((card) => (
          <div className={css.card} key={card.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.cardLink} to={getViewCardsRoute({ cardNick: card.nick })}>
                  {card.name}
                </Link>
              }
              description={card.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
