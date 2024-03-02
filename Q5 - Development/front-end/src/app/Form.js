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

    const formData = {
      task: new FormData(event.currentTarget),
      time: Date.now(),
      status: 'incomplete'
    }
    console.log(formData)

    const response = await fetch('http://localhost:5000/catalog/item', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })

    if (!response.ok)
      throw new Error('Failed to POST data to server')

    props.setData(prevData => prevData.append(response.json().body))
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
