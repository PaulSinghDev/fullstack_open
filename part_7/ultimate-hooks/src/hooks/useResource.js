import { useEffect, useState } from 'react'
import axios from 'axios'

export default (baseUrl) => {
  const [resources, setResources] = useState([])

  // initialize a token variable
  let token

  // Set the initial data
  useEffect(() => {
    axios.get(baseUrl).then((response) => setResources(response.data))
  }, [baseUrl])

  // Get all entries from the resource
  const getAll = async () => setResources((await axios.get(baseUrl)).data)

  // Create a new resource and append it to the resources array
  const create = async (payload) => {
    const config = {
      headers: { Authorization: token },
    }
    const data = (await axios.post(baseUrl, payload, config)).data
    const updated = resources.concat(data)
    setResources(updated)
  }

  // Define function to set the auth token
  const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

  // Define function to update
  const update = async (id, payload) => {
    const config = {
      headers: { Authorization: token },
    }
    const data = (await axios.put(`${baseUrl}/${id}`, payload, config)).data
    const newResources = resources.filter((resource) =>
      resource.id !== id ? resource : data
    )
    setResources(newResources)
  }

  const service = {
    create,
    setToken,
    update,
    getAll,
  }

  return [resources, service]
}
