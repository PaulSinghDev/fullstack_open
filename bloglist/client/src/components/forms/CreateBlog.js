import React from 'react'
import { useField } from '../../hooks'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/bloglistReducer'

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const { reset: resetTitle, ...titleOptions } = title
  const { reset: resetAuthor, ...authorOptions } = author
  const { reset: resetUrl, ...urlOptions } = url

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    )
    resetAuthor()
    resetTitle()
    resetUrl()
  }

  return (
    <div className="new-blog-form" aria-hidden="true">
      <h2>New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div
          className="form-input"
          data-has-content={title.value ? 'true' : 'false'}
        >
          <label>Title</label>
          <input id="new-blog-title" {...titleOptions} />
        </div>
        <div
          className="form-input"
          data-has-content={author.value ? 'true' : 'false'}
        >
          <label>Author</label>
          <input id="new-blog-author" {...authorOptions} />
        </div>
        <div
          className="form-input"
          data-has-content={url.value ? 'true' : 'false'}
        >
          <label>URL</label>
          <input id="new-blog-url" {...urlOptions} />
        </div>
        <button id="submit-blog" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
