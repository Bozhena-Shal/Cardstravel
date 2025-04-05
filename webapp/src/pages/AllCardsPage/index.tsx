import { Link } from 'react-router-dom'
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
    <div>
      <h1 className={css.title}>All Cards</h1>
      <div className={css.cards}>
        {data.cards.map((card) => (
          <div className={css.card} key={card.nick}>
            <h2 className={css.cardName}>
              <Link className={css.cardLink} to={getViewCardsRoute({ cardNick: card.nick })}>
                {card.name}
              </Link>
            </h2>
            <p className={css.cardideaDescription}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
