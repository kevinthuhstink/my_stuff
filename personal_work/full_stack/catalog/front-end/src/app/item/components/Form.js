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

    //Displays a success/error message.
    function setRequestStatus(currStatus) {
      if (currStatus === "SUCCESS") {
        setStatus(prevStatus => ({
          text: "Item listing success",
          style: "text-lime-600",
        }))
        return
      }

      var errorMessage = "Unknown error occurred"
      switch (currStatus) {
        case "EMPTY_FIELDS":
          errorMessage = "Form fields must not be empty"
          break

        case "PRICE_NAN":
          errorMessage = "Price must be a positive integer"
          break

        case "FETCH_FAIL":
          errorMessage = "Failed to send data to server, come back later"
          break

        case "NO_USER":
          errorMessage = (
            <p>
              You need to be logged in to list items. Sign up
              <a href="/signup" className="underline text-blue-600"> here </a>
              or log in
              <a href="/login" className="underline text-blue-600"> here </a>
              if you have an account.
            </p>
          )
      }

      setStatus(prevStatus => ({
        text: errorMessage,
        style: "text-red-500",
      }))
    }

    if (user.current === null) {
      setRequestStatus("NO_USER")
      return
    }

    for (var field in input) {
      if (input[field].trim().length === 0) {
        setRequestStatus("EMPTY_FIELDS")
        return
      }
    }


    //Checks if the new price has any non-numeric characters.
    const priceIsNumber = () => input.price.split('')
      .reduce((bool, char) => bool && '0123456789'.includes(char))

    if (!priceIsNumber()) {
      setRequestStatus("PRICE_NAN")
      return
    }

    const fetchLink = 'http://localhost:5000/catalog/item'
    const formData = {
      ...input,
      owner: username.current,
      status: ''
    }

    var response
    try {
      response = await fetch(fetchLink, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
    } catch(exception) {
      setRequestStatus("FETCH_FAIL")
      return
    }

    if (!response.ok) {
      setRequestStatus("FETCH_FAIL")
      return
    }

    response.json().then(res => {
      setRequestStatus("SUCCESS")
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
