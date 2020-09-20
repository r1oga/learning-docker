import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default () => {
  const [values, setValues] = useState({})
  const [seenIndexes, setSeenIndexes] = useState([])
  const [index, setIndex] = useState('')

  const fetchValues = async () => {
    const { data: values } = await axios.get('/api/values/current')
    setValues(values)
  }

  const fetchIndexes = async () => {
    const { data: seenIndexes } = await axios.get('/api/values/all')
    setSeenIndexes(seenIndexes)
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    await axios.post('/api/values', { index })
    setIndex('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='index'>Enter your index:</label>
        <br />
        <input
          id='index'
          value={index}
          onChange={event => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(', ')}
      <h3>Calculated Values</h3>
      {Object.entries(values).map(([index, value], key) => (
        <div key={key}>{`${index}: ${value}`}</div>
      ))}
    </div>
  )
}
