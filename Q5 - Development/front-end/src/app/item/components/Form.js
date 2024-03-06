import React from 'react'

/**
 * A form that takes user input and posts that information as a new catalog item
 * to the server.
 */
export default function Form(props) {

  //React state for form inputs.
  const [input, setInput] = React.useState({
    name: "",
    price: "",
    owner: "",
  })

  /**
   * Sends a request to the server to create a new catalog item.
   * Server responds with the newly created catalog item, and
   * the catalog data is updated with the new item.
   */
  async function onSubmit(event) {
    event.preventDefault()

    for (var field in input)
      if (input[field].trim().length < 1)
        throw new Error("Form fields must not be empty")

    const fetchLink = 'http://localhost:5000/catalog/item'
    const formData = {
      ...input,
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

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col w-[600px] p-6">
        <div className="grid grid-cols-3 gap-3 text-l">
          <label>Your Name:</label>
          <input
            type="text"
            name="owner"
            value={input.owner}
            onInput={handleInput}
            className="border border-black bg-gray-200 rounded col-span-2">
          </input>
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
        </div>
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
