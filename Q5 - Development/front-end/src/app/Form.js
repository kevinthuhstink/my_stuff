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

    const formData = new FormData(event.currentTarget)
    formData.time = Date.now()
    formData.status = 'incomplete'

    const response = await fetch('https://localhost:5000/catalog/item', {
      method: 'POST',
      body: formData
    })

    return response.json()
  }

  //Updates the input state on user input
  function handleInput(event) {
    event.preventDefault()
    setTaskInput(event.target.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Input new task</label>
      <input
        type="text"
        name="task"
        value={taskInput}
        onInput={handleInput}
        placeholder="Task">
      </input>
      <button type="submit">
        Submit new task!
      </button>
    </form>
  )
}
