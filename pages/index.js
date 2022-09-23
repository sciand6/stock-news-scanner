import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [tickerString, setTickerString] = useState('')

  const getArticles = (timePeriod) => {
    const tickers = tickerString.split(',')
    setArticles([])
    tickers.forEach(async (ticker) => {
      const response = await fetch(`/api/articles/${ticker}`)
      let data = await response.json()

      if (!data.items) {
        return
      }

      if (timePeriod === 'today') {
        data.items = data.items.filter(
          (item) =>
            new Date(item.published).toDateString() ===
            new Date().toDateString(),
        )
      }

      if (data.items[0]) {
        data.items[0].ticker = ticker
        setArticles((current) => [...current, data.items[0]])
      }
    })
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Head>
        <title>Stock News Scanner</title>
        <meta
          name="description"
          content="Enter some tickers and get the latest news"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-2xl font-bold underline mb-2">Enter Tickers</h2>
      <input
        type="text"
        className="w-4/5"
        onChange={(e) => setTickerString(e.target.value)}
      ></input>
      <div>
        <button
          className="mx-1 my-2 p-2 bg-black rounded text-white"
          onClick={getArticles}
        >
          Latest
        </button>
        <button
          className="mx-1 p-2 bg-black rounded text-white"
          onClick={() => {
            getArticles('today')
          }}
        >
          Today
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-2">Get News</h2>

      {articles.map((article) => {
        return article ? (
          <Link href={article.link}>
            <div
              className="rounded bg-white p-2 shadow mb-3 cursor-pointer hover:bg-sky-50 w-11/12"
              key={article.title}
            >
              <h1 className="text-2xl bold uppercase">{article.ticker}</h1>
              <h2 className="text-xl">{article.title}</h2>
              <i>{new Date(article.published).toUTCString()}</i>
              <p>{article.description}</p>
            </div>
          </Link>
        ) : (
          ''
        )
      })}
    </div>
  )
}
