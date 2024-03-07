import React from 'react'

/**
 * A form that takes user input and posts that information as a new catalog item
 * to the server.
 * All users that want to submit items for sale must be logged into an account.
 * Price must be an integer number; decimals are not supported.
 */
export default function Form() {

  //React state for form inputs.
  const [input, setInput] = React.useState({
    name: "",
    price: "",
    description: "",
  })

  //State that display success/errors with the form submission
  const [status, setStatus] = React.useState({
    text: "",
    style: "",
  })

  //Stores user information.
  const user = React.useRef()
  const username = React.useRef()
  React.useEffect(() => {
    user.current = window.sessionStorage.getItem('userid')
    username.current = window.sessionStorage.getItem('username')
  }, [])

  /**
   * Sends a request to the server to create a new catalog item.
   * Server responds with the newly created catalog item, and
   * the catalog data is updated with the new item.
   */
  async function onSubmit(event) {
    event.preventDefault()

    function setFormStatus(currStatus) {
      switch (currStatus) {
        case "SUCCESS":
          setStatus(prevStatus => ({
            text: "Item listing success",
            style: "text-lime-600",
          }))
          break

        case "EMPTY_FIELDS":
          setStatus(prevStatus => ({
            text: "Form fields must not be empty",
            style: "text-red-500",
          }))
          break

        case "PRICE_NAN":
          setStatus(prevStatus => ({
            text: "Price must be a positive integer",
            style: "text-red-500",
          }))
          break

        case "FETCH_FAIL":
          setStatus(prevStatus => ({
            text: "Failed to send data to server, come back later",
            style: "text-red-500",
          }))
          break

        case "NO_USER":
          setStatus(prevStatus => ({
            text:
              <p>
                You need to be logged in to list items. Sign up
                  <a href="/signup" className="underline text-blue-600"> here </a>
                or log in
                  <a href="/login" className="underline text-blue-600"> here </a>
                if you have an account.
              </p>,
            style: "text-red-500",
          }))
          break
      }
    }

    if (user.current === null) {
      setFormStatus("NO_USER")
      return
    }

    for (var field in input) {
      if (input[field].trim().length < 1) {
        setFormStatus("EMPTY_FIELDS")
        return
      }
    }


    //Checks if all chars in the price input field is a number.
    function priceIsNumber() {
      for (const char of input.price)
        if (!'0123456789'.includes(char))
          return false
      return true
    }
    if (!priceIsNumber()) {
      setFormStatus("PRICE_NAN")
      return
    }

    const fetchLink = 'http://localhost:5000/catalog/item'
    const formData = {
      ...input,
      time: Date.now(),
      owner: username.current,
      status: 'none'
    }

    const response = await fetch(fetchLink, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      setFormStatus("FETCH_FAIL")
      return
    }

    response.json().then(res => {
      setFormStatus("SUCCESS")
      window.location.href = "http://localhost:3000/catalog/"
      return
    })
  }

  //State handler/updater for form inputs.
  function handleInput(event) {
    event.preventDefault()
    const { name, value } = event.target
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }))
  }

  /**
   * Displays the account username in the item creation form.
   * If user isn't logged in to an account, displays a message with links
   * to login and signup pages
   */
  function accountDisplay() {
    if (user.current === null)
      return (
        <p>
          You need to be logged in to list items. Sign up
          <a href="/signup" className="underline text-blue-600"> here </a>
          or log in
          <a href="/login" className="underline text-blue-600"> here </a>
          if you have an account.
        </p>
      )

    return <p>Account username: {username.current}</p>
  }

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col w-[600px] p-6">
        {accountDisplay()}
        <div className="grid grid-cols-3 gap-3 text-l">
          <label>Item name:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onInput={handleInput}
            className="border border-black bg-gray-200 rounded col-span-2">
          </input>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={input.price}
            onInput={handleInput}
            className="border border-black bg-gray-200 rounded col-span-2">
          </input>
          <label>Description:</label>
          <textarea
            name="description"
            value={input.description}
            onInput={handleInput}
            className="border border-black bg-gray-100 col-span-2" />
        </div>
        <div className={status.style}>{status.text}</div>
        <button
          type="submit"
          className="border border-black bg-red-100 rounded mt-6
                     h-[40px] w-[60%] place-self-center">
          Submit new item!
        </button>
      </form>
    </div>
  )
}
