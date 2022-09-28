import Head from 'next/head'
import ArticleList from '../components/ArticleList'

export default function Home() {
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
      <h2 className="text-2xl m-1 font-bold underline mb-2 text-primary">
        Stock News Scanner
      </h2>
      <ArticleList />
    </div>
  )
}
