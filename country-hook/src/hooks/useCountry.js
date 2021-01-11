import { useState, useEffect } from 'react'
import { getCountryByName } from '../services/countries'

export default (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name.length < 3 || !name) return
    getCountryByName(name)
      .then((country) => {
        setCountry(country[0])
      })
      .catch((error) =>
        error.response.status === 404 ? null : console.log(error)
      )
  }, [name])

  if (name.length < 3 || !name) return null

  return country ? { found: true, data: country } : { found: false }
}
