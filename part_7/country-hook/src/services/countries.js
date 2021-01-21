import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2'

export const getCountryByName = async (name) =>
  (await axios.get(`${baseUrl}/name/${name}?fullText=true`)).data
