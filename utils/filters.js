export const filterArticlesByTimePeriod = (timePeriod = '', items = []) => {
  if (timePeriod === 'today') {
    items = items.filter(
      (item) =>
        new Date(item.published).toDateString() === new Date().toDateString(),
    )
  }

  return items
}
