'use client'

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

    const response = await fetch('/catalog/item', {
      method: 'POST',
      body: formData
    })
  }

  function handleInput(event) {
    event.preventDefault()

    const {name, value} = event.target
    setTaskInput(() => value)
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
