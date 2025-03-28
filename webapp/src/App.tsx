export const App = () => {
  const cards = [
    { nick: 'cool-idea-nick-1', name: 'Idea 1', description: 'description of idea 1...' },
    { nick: 'cool-idea-nick-2', name: 'Idea 2', description: 'description of idea 2...' },
    { nick: 'cool-idea-nick-3', name: 'Idea 3', description: 'description of idea 3...' },
    { nick: 'cool-idea-nick-4', name: 'Idea 4', description: 'description of idea 4...' },
    { nick: 'cool-idea-nick-5', name: 'Idea 5', description: 'description of idea 5...' },
  ]
  return (
    <div>
      <h1>Cards</h1>
      {cards.map((card) => {
        return (
          <div key={card.nick}>
            <h2>{card.name}</h2>
            <p>{card.description}</p>
          </div>
        )
      })}
    </div>
  )
}
