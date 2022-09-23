import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [tickerString, setTickerString] = useState('')

  const getArticles = () => {
    const tickers = tickerString.split(',')
    setArticles([])
    tickers.forEach(async (ticker) => {
      const response = await fetch(`/api/articles/${ticker}`)
      const data = await response.json()
      // data.items[0] = the latest article
      if (data.items[0]) {
        data.items[0].ticker = ticker
        setArticles((current) => [...current, data.items[0]])
      }
    })
  }

  return (
    <div>
      <Head>
        <title>Stock News Scanner</title>
        <meta
          name="description"
          content="Enter some tickers and get the latest news"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Enter Tickers</h2>
      <input
        type="text"
        onChange={(e) => setTickerString(e.target.value)}
      ></input>
      <h2>Get News</h2>
      <button onClick={getArticles}>Today</button>
      <button onClick={getArticles}>This Week</button>
      <button onClick={getArticles}>This Month</button>
      <button onClick={getArticles}>This Year</button>
      {articles.map((article) => {
        return article ? (
          <div key={article.title}>
            <h1>{article.ticker}</h1>
            <h2>{article.title}</h2>
            <i>{new Date(article.published).toUTCString()}</i>
            <p>{article.description}</p>
          </div>
        ) : (
          ''
        )
      })}
    </div>
  )
}
