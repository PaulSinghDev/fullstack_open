import axios from 'axios'
import { asObject } from '../reducers/reducer_helper'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}
const createNew = async (content) => {
  return (await axios.post(baseUrl, asObject(content))).data
}

export default { getAll, createNew }
