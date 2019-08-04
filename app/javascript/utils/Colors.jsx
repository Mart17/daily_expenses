export const setAmountColorClass = (amount) => {
  if (parseFloat(amount) === 0) {
    return 'neutral'
  } else {
    return (amount > 0 ? 'positive' : 'negative')
  }
}
