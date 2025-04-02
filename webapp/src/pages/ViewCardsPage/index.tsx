import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'

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
    <div>
      <h1>{data.card.name}</h1>
      <p>{data.card.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.card.text }} />
    </div>
  )
}
