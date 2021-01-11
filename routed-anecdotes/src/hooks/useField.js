import { useState } from 'react'

export default (type = null) => {
  const [value, setValue] = useState('')

  const onChange = (event) => setValue(event.target.value)

  const reset = () => setValue('')

  return { type, value, onChange, reset }
}
