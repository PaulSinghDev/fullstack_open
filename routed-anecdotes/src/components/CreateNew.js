import React from 'react'
import { useField } from '../hooks/'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const { reset: contentReset, ...contentProperties } = { ...content }
  const { reset: authorReset, ...authorProperties } = { ...author }
  const { reset: infoReset, ...infoProperties } = { ...info }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
  }

  const handleReset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div className="create-new">
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentProperties} />
        </div>
        <div>
          author
          <input name="author" {...authorProperties} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoProperties} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
