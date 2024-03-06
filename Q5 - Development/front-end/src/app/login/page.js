'use client'

import React from 'react'
import Topbar from '../components/Topbar.js'

export default function Page() {

  //React state handlers for form fields
  const [input, setInput] = React.useState({
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
   * Checks login credentials and sends client to the catalog page
   * if login was successful.
   */
  async function onSubmit() {

    /**
     * Function to set the status.text and style fields
     * that display success/errors with the form submission
     */
    function setLoginStatus(curr_status) {
      switch (curr_status) {
        case "SUCCESS":
          setStatus(prevStatus => ({
            ...input,
            text: "Successful login",
            style: "text-lime-600",
          }))
          break

        case "EMPTY_FIELDS":
          setStatus(prevStatus => ({
            ...input,
            text: "Form fields must not be empty",
            style: "text-red-500",
          }))
          break

        case "FETCH_FAIL":
          setStatus(prevStatus => ({
            ...input,
            text: "Failed to fetch data from server, come back later",
            style: "text-red-500",
          }))
          break

        case "LOGIN_FAIL":
          setStatus(prevStatus => ({
            ...input,
            text: "Invalid login credentials, please try again",
            style: "text-red-500",
          }))
          break

        default:
          setStatus(prevStatus => ({
            ...input,
            text: "Unknown error occurred",
            style: "text-red-500",
          }))
      }
    }

    event.preventDefault()

    for (var field in input) {
      if (input[field].trim().length < 1) {
        setLoginStatus("EMPTY_FIELDS")
        return
      }
    }

    const fetchLink = 'http://localhost:5000/signup'
    const response = await fetch(fetchLink, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(input)
    })

    if (!response.ok) {
      setLoginStatus("FETCH_FAIL")
      return
    }

    response.json().then(res => {
      if (!res.body) {
        setLoginStatus("LOGIN_FAIL")
        return
      }
      setLoginStatus("SUCCESS")
      window.location.href = "http://localhost:3000/catalog/"
      return
    }).catch(res => {
      setLoginStatus("UNKNOWN_ERROR")
    })
    setLoginStatus("UNKNOWN_ERROR")
  }

  return (
    <>
      <Topbar title="Login Form"/>
      <div className="w-full flex flex-col h-[calc(100%-120px)] place-items-center
                      fixed bottom-0">
        <form onSubmit={onSubmit} className="flex flex-col w-[600px] p-6">
          <div className="grid grid-cols-3 gap-3 text-l">
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
            Login
          </button>
        </form>
        <p>Sign up
          <a href="/signup" className="underline text-blue-600"> here </a>
        if you don't have an account</p>
      </div>
    </>
  )
}
