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
        <label>Enter your index</label>
        <input value={index} onChange={event => setIndex(event.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(', ')}
      <h3>Calculated Values</h3>
      {Object.values(values).map((value, index) => (
        <div key={index}>
          For index {index} I calculated {value}
        </div>
      ))}
    </div>
  )
}
