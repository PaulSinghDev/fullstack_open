import axios from 'axios'
const url = '/api/login'

let token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const login = async (credentials) => {
  const response = (await axios.post(url, credentials)).data
  window.localStorage.setItem('loggedInUser', JSON.stringify(response))
  return response
}

const logout = () => {
  token = undefined
  window.localStorage.removeItem('loggedInUser')
}

const checkForToken = () => {
  const user = window.localStorage.getItem('loggedInUser')
  if (!user) return null
  return JSON.parse(user)
}

const register = async (user) => {
  await axios.post('/api/users', user)
  const response = await login(user)
  return response
}

const remove = async (id) => {
  const config = {
    Authorization: token,
  }
  const response = (await axios.delete(`${url}/${id}`, config)).data
  window.localStorage.removeItem('loggedInUser')
  token = undefined
  return response
}

const getAllUsers = async () => {
  try {
    const response = await axios.get(`/api/users`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getById = async (id) => {
  const response = await axios.get(`/api/users/${id}`)
  return response.data
}

export default {
  login,
  checkForToken,
  logout,
  register,
  remove,
  setToken,
  getAllUsers,
  getById,
}
