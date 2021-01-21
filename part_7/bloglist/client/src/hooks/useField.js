import { useState } from 'react'

const useField = (type = 'text', name = '') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    reset,
    name,
  }
}

export default useField
