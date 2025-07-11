import express from 'express'
import router from './snippets.js'
const app = express()
const port = process.env.PORT || 4000

app.use(router)


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})