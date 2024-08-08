const scores = {
  Anna: 10,
  Olga: 3,
  Oleg: 8,
}

function getScores(scores) {
  let sum = 0
  for (const score in scores) {
    sum += scores[score]
  }
  return sum
}
