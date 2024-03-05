import React from 'react'

/**
 * A form that takes user input and posts that information as a new catalog item
 * to the server.
 *
 * props
 *   setData: A function to set catalog data.
 *            Used for rebuilding the catalog upon submission of a new item.
 */
export default function Form(props) {

  //React state for form inputs.
  const [taskInput, setTaskInput] = React.useState("")

  /**
   * Sends a request to the server to create a new catalog item.
   * Server responds with the newly created catalog item, and
   * the catalog data is updated with the new item.
   */
  async function onSubmit(event) {
    event.preventDefault()

    const fetchLink = 'http://localhost:5000/catalog/item'
    const formData = {
      name: new FormData(event.target).get('name'),
      time: Date.now(),
      status: 'incomplete'
    }

    const response = await fetch(fetchLink, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })

    if (!response.ok)
      throw new Error('Failed to POST data to server')

    response.json().then(resData => {
      props.setData(prevData => prevData.concat(resData.body))
    })
  }

  //State handler/updater for form inputs.
  function handleInput(event) {
    event.preventDefault()
    setTaskInput(event.target.value)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label>Input new task:</label>
      <input
        type="text"
        name="name"
        value={taskInput}
        onInput={handleInput}
        placeholder="New data entry"
        className="border border-black bg-gray-300 mb-[10px]">
      </input>
      <button type="submit" className="border border-black bg-gray-300 rounded">
        Submit new item!
      </button>
    </form>
  )
}
