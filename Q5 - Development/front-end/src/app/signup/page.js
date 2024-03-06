'use client'

import React from 'react'

export default function Page() {

  //React state handlers for form fields
  const [input, setInput] = React.useState({
    name: "",
    username: "",
  })

  //React state updater for form fields
  function handleInput(event) {
    const { name, value } = event.target
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }))
  }

  /**
   * Sends a request to the server to create a new user.
   * Server responds with the new user information.
   */
  async function onSubmit() {
    event.preventDefault()

    for (var field in input) {
      if (input[field].trim().length < 1) {
        throw new Error("Form fields must not be empty")
        return
      }
    }

    const fetchLink = 'http://localhost:5000/signup'
    const response = await fetch(fetchLink, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(input)
    })

    if (!response.ok)
      throw new Error('Failed to POST data to server')
    response.json().then(res => console.log(res))
  }

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col w-[600px] p-6">
        <div className="grid grid-cols-3 gap-3 text-l">
          <label>Your Name:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onInput={handleInput}
            className="border border-black bg-gray-200 rounded col-span-2">
          </input>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onInput={handleInput}
            className="border border-black bg-gray-200 rounded col-span-2">
          </input>
        </div>
        <button
          type="submit"
          className="border border-black bg-red-100 rounded mt-6
                     h-[40px] w-[60%] place-self-center">
          Create Account
        </button>
      </form>
    </div>
  )
}
