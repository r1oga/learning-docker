const { redisHost, redisPort } = require('./keys')
const redis = require('redis')

const redisClient = redis.createClient({
  host: redisHost,
  port: redisPort,
  retry_strategy: () => 1000
})

// subscription
const sub = redisClient.duplicate()

/* not best performing implementation. Quite slow.
  Which justifies the use of redis + worker (learning purpose)
*/
const fib = index => (index < 2 ? 1 : fib(index - 1) + fib(index - 2))

sub.on('message', (channel, message) => {
  // Sets field in the hash stored at key to value.
  redisClient.hset('values', message, fib(+message))
})
sub.subscribe('insert')
