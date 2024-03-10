'use client'

import React from 'react'
import Topbar from '../components/Topbar.js'
import Dropdown from '../components/Dropdown.js'

export default function Page() {

  //React state handler for Dropdown
  const [dropdown, setDropdown] = React.useState(false)

  //React state handlers for form fields
  const [input, setInput] = React.useState({
    name: "",
    username: "",
    password: "",
  })

  //State that display success/errors with the form submission
  const [status, setStatus] = React.useState({
    text: "",
    style: "",
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

    //Displays a success/error message.
    function setRequestStatus(currStatus) {
      if (currStatus === "SUCCESS") {
        setStatus(prevStatus => ({
          text: "Successful login",
          style: "text-lime-600",
        }))
        return
      }

      var errorMessage = "Unknown error occurred"
      switch (currStatus) {

        case "EMPTY_FIELDS":
          errorMessage = "Form fields must not be empty"
          break

        case "FETCH_FAIL":
          errorMessage = "Failed to send data to server, come back later"
          break

        case "SIGNUP_FAIL":
          errorMessage = "Username already in use, please try a different username"
      }

      setStatus(prevStatus => ({
        text: errorMessage,
        style: "text-red-500",
      }))
    }

    event.preventDefault()
    for (var field in input) {
      if (input[field].trim().length < 1) {
        setRequestStatus("EMPTY_FIELDS")
        return
      }
    }

    const fetchLink = 'http://localhost:5000/signup'
    var response
    try {
      response = await fetch(fetchLink, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(input)
      })
    } catch(exception) {
      setLoginStatus("FETCH_FAIL")
      return
    }

    if (!response.ok) {
        setRequestStatus("FETCH_FAIL")
        return
    }

    response.json().then(res => {
      if (!res.body) {
        setRequestStatus("SIGNUP_FAIL")
        return
      }

      setRequestStatus("SUCCESS")
      window.sessionStorage.setItem('userid', res.body.id)
      window.sessionStorage.setItem('username', res.body.username)

      window.location.href = "http://localhost:3000/catalog/"
      return
    })
  }

  return (
    <>
      <Topbar title="Signup Form" dropdown={dropdown} setDropdown={setDropdown} />
      <div className="w-full flex flex-col place-items-center">
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

            <label>Password:</label>
            <input
              type="text"
              name="password"
              value={input.password}
              onInput={handleInput}
              className="border border-black bg-gray-200 rounded col-span-2">
            </input>

          </div>
          <p className={status.style}>{status.text}</p>
          <button
            type="submit"
            className="border border-black bg-red-100 rounded mt-6
            h-[40px] w-[60%] place-self-center">
            Create Account
          </button>
        </form>
        <p>Login
          <a href="/login" className="underline text-blue-600"> here </a>
          if you already have an account</p>
      </div>
      <Dropdown showWhen={dropdown}/>
    </>
  )
}
