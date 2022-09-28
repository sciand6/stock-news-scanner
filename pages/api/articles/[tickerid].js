const { parse } = require('rss-to-json')

export default async (req, res) => {
  const { tickerid } = req.query
  const response = await parse(
    `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${tickerid}&region=US&lang=en-US`,
  )

  return res.status(200).json(response)
}
