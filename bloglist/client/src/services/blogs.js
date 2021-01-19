import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => (token = `bearer ${newToken}`)

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getByUsername = async (username) => {
  const response = await axios.get(`${baseUrl}/${username}`)
  return response.data
}

const getByUserId = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/?user=${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const checkForToken = () => {
  const user = window.localStorage.getItem('loggedInUser')
  if (!user) return null
  return JSON.parse(user)
}

const postComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comment`, { comment })
  return response.data
}

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

export default {
  getAll,
  setToken,
  create,
  getByUsername,
  update,
  remove,
  checkForToken,
  getByUserId,
  getById,
  postComment,
  getComments,
}
