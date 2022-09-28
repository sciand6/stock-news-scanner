import { useState } from 'react'
import Article from '../components/Article'
import { filterArticlesByTimePeriod } from '../utils/filters'

function ArticleList() {
  const [articles, setArticles] = useState([])
  const [tickerString, setTickerString] = useState('')

  const getArticles = (timePeriod = '') => {
    const tickers = tickerString.split(',')
    setArticles([])

    tickers.forEach(async (ticker) => {
      const response = await fetch(`/api/articles/${ticker}`)
      let data = await response.json()

      if (!data.items || data.items.length === 0) return

      data.items[0].ticker = ticker
      data.items = filterArticlesByTimePeriod(timePeriod, data.items)

      setArticles((current) => [...current, data.items[0]])
    })
  }

  return (
    <>
      <input
        type="text"
        className="w-4/5"
        placeholder="AAPL,AMZN,NFLX..."
        onChange={(e) => setTickerString(e.target.value)}
      ></input>
      <div>
        <button className="btn mx-1 my-2" onClick={() => getArticles('')}>
          Latest
        </button>
        <button
          className="btn mx-1 p-2"
          onClick={() => {
            getArticles('today')
          }}
        >
          Today
        </button>
      </div>

      {articles.map((article) => {
        return article ? <Article article={article} /> : ''
      })}
    </>
  )
}

export default ArticleList
