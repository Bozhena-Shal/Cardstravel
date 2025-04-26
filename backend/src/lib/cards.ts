import _ from 'lodash'

export const cards = _.times(100, (i) => ({
  nick: `cool-card-nick-${i}`,
  name: `card ${i}`,
  description: `Description of card ${i}...`,
  text: _.times(100, (j) => `<p>Text paragrph ${j} of card ${i}...</p>`).join(''),
}))
