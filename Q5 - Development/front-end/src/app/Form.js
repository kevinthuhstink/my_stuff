import React from 'react'

/**
 * A form that takes text input and posts that information as a new task
 * to the server upon submission.
 */
export default function Form(props) {

  //State manager for input
  const [taskInput, setTaskInput] = React.useState("")

  async function onSubmit(event) {
    event.preventDefault()

    const fetchLink = 'http://localhost:5000/catalog/item'
    const formData = {
      task: new FormData(event.target).get('task'),
      time: Date.now() % 1000,
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

  //Updates the input state on user input
  function handleInput(event) {
    event.preventDefault()
    setTaskInput(event.target.value)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label>Input new task:</label>
      <input
        type="text"
        name="task"
        value={taskInput}
        onInput={handleInput}
        placeholder="Task"
        className="border border-black bg-gray-300 mb-[10px]">
      </input>
      <button type="submit" className="border border-black bg-gray-300 rounded">
        Submit new task!
      </button>
    </form>
  )
}
