import axios from 'axios'
const url = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(url, credentials)
  return response.data
}

const logout = () => window.localStorage.removeItem('loggedInUser')

const checkForToken = () => {
  const user = window.localStorage.getItem('loggedInUser')
  if (!user) return null
  return JSON.parse(user)
}

export default { login, checkForToken, logout }
