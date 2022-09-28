import Link from 'next/link'
import React from 'react'

function Article({ article }) {
  return (
    <Link href={article.link}>
      <div className="article" key={article.title}>
        <h1 className="text-2xl bold uppercase">{article.ticker}</h1>
        <h2 className="text-xl">{article.title}</h2>
        <i>{new Date(article.published).toUTCString()}</i>
        <p>{article.description}</p>
      </div>
    </Link>
  )
}

export default Article
