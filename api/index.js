const {
  pgUser,
  pgHost,
  pgPassword,
  pgPort,
  pgDatabase,
  redisHost,
  redisPort
} = require('./keys')

// Express App Setup
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Postgres Client Setup
const { Pool } = require('pg')
const pgClient = new Pool({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort
})
pgClient.on('connect', () => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values(number INT)')
    .catch(err => console.log(err))
})

// Redis Client Setup
const redis = require('redis')
const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  redis_strategy: () => 1000
})
const redisPublisher = redisClient.duplicate()

// Express route handlers
const routes = require('./routes')
routes(app, redisClient, redisPublisher, pgClient)

app.listen(5000, err => console.log('Listening on port 5000'))
