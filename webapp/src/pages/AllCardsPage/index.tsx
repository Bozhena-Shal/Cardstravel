import { trpc } from '../../lib/trpc'

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
      <h1>All Ideas</h1>
      {data.cards.map((card) => (
        <div key={card.nick}>
          <h2>{card.name}</h2>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  )
}


  
   

  