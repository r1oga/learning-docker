module.exports = (app, redisClient, redisPublisher, pgClient) => {
  app.get('/', (req, res) => {
    res.send('Hi')
  })

  app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values')
    res.send(values.rows)
  })

  app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
      res.send(values)
    })
  })

  app.post('/values', async (req, res) => {
    const index = req.body.index
    if (+index > 40) {
      return res.status(422).send('Index too high')
    }

    redisClient.hset('values', index, 'Nothing yet!')
    redisPublisher.publish('insert', index)
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

    res.send({ working: true })
  })
}
