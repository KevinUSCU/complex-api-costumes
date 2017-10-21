const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.disable('x-server-by')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(morgan('dev'))

const routes = require('./src/routes/costumes-routes')
app.use('/costumes', routes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'That resource was not found. (But I bet it would have been aweesome!)' }})
})

const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)

module.exports = app