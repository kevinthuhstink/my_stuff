'use client'

import Topbar from '../../components/Topbar.js'
import Dropdown from '../../components/Dropdown.js'
import React from 'react'


/**
 * Gets this item's information from the database.
 *
 * params
 *   id: The item's id to get.
 */
async function getItem(id) {
  const fetchLink = 'http://localhost:5000/catalog/' + id
  console.log(fetchLink)
  const res = await fetch(fetchLink)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


export default function Page(params) {

  //State handler for dropdown menu
  const [dropdown, setDropdown] = React.useState(false)

  //Item removal success/failure message
  const [status, setStatus] = React.useState({
    text: "",
    style: "",
  })

  const [data, setData] = React.useState({
    sale: ""
  })
  const user = React.useRef()
  const username = React.useRef()


  //Initializes item data for display.
  React.useEffect(() => {
    user.current = window.sessionStorage.getItem('userid')
    username.current = window.sessionStorage.getItem('username')

    getItem(params.params.item).then(res => {

      /**
       * Formats the time.
       * return: A string representation of the item's time.
       */
      function formatTime() {
        const dateFormat = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
          timeZone: "America/New_York"
        }

        const date = new Date(res.body.time)
        return Intl.DateTimeFormat('en-US', dateFormat).format(date)
      }

      setData({
        ...res.body,
        time: formatTime(),
      })

    })
  }, [params.params.item])


  //Displays a success/error message.
  function setRequestStatus(currStatus) {
    if (currStatus === "REMOVE_SUCCESS") {
      setStatus(prevStatus => ({
        text: "Removal successful",
        style: "text-lime-600",
      }))
      return
    }

    if (currStatus === "SALE_SUCCESS") {
      setStatus(prevStatus => ({
        text: "Price update successful",
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
        errorMessage = "Failed to fetch data from server, come back later"
        break

      case "REMOVE_FAIL":
        errorMessage = "Server error during item removal"
        break

      case "PRICE_INVALID":
        errorMessage = "New price must be a positive integer less than current price"
        break

      case "PRICE_FAIL":
        errorMessage = "New price must be lower than previous price"
        break

      case "NO_USER":
        errorMessage = (
          <p>
            You need to be logged in to purchase items. Sign up
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

  //React state updater for form (sale) field
  function handleInput(event) {
    const { name, value } = event.target
    setData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  /**
   * Handles removal of this item, whether by another user purchasing it
   * or from the seller removing it from the catalog.
   */
  async function handleRemove() {
    event.preventDefault()

    const fetchLink = 'http://localhost:5000/catalog/item/' + data.id
    const response = await fetch(fetchLink, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: null
    })

    if (!response.ok) {
      setRequestStatus("FETCH_FAIL")
      return
    }

    response.json().then(res => {
      if (res.body.id !== data.id) {
        setRequestStatus("REMOVE_FAIL")
        return
      }
      setRequestStatus("REMOVE_SUCCESS")
      window.location.href = "/catalog"
    })
  }


  /**
   * If a user is the seller for an item, give them the option to
   * put the item on sale.
   * User chooses a new price to set the item to, less than the original price.
   */
  async function setSale(event) {
    event.preventDefault()

    //Checks if the new price has any non-numeric characters.
    const priceIsNumber = () => data.sale.split('')
      .reduce((bool, char) => bool && '0123456789'.includes(char))

    if (!priceIsNumber() || parseInt(data.sale) >= data.price) {
      setRequestStatus("PRICE_INVALID")
      return
    }

    const fetchLink = 'http://localhost:5000/item/'
    const response = await fetch(fetchLink, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: data.id, sale: data.sale })
    })

    if (!response.ok) {
      setRequestStatus("FETCH_FAIL")
      return
    }

    response.json().then(res => {
      setRequestStatus("SALE_SUCCESS")
      console.log(res.body.price)
      setData(prevData => ({
        ...res.body,
        sale: ""
      }))
    })
  }

  //Have different item options for the seller and other users
  var itemOptions
  if (data.owner === username.current) {
    itemOptions = (
      <>
        <button
          onClick={handleRemove}
          className="p-4 bg-red-100 rounded border border-black md:mr-8 sm:mb-4">
          Remove Item
        </button>
        <form
          onSubmit={setSale}
          className="p-4 bg-red-100 rounded border border-black">
          <label className="mr-4">Put on sale</label>
          <input
            type="text"
            name="sale"
            placeholder="New price"
            value={data.sale}
            onInput={handleInput}
            className="bg-gray-100 rounded mr-4 w-[120px]"/>
          <button className="bg-red-300 rounded border border-black p-2">Submit</button>
        </form>
      </>
    )
  }

  else
    itemOptions = (
      <button
        onClick={handleRemove}
        className="p-4 bg-red-100 rounded border border-black">
        Purchase
      </button>
    )


  return (
    <>
      <Topbar title={data.name} dropdown={dropdown} setDropdown={setDropdown} />
      <section className="flex flex-col h-full w-full justify-between p-8 overflow-y-auto">

        <div className="mb-12">
          <p className="mb-6 text-2xl">Seller: {data.owner}</p>
          <p>Description:<br/>{data.description}</p>
        </div>

        <div className="md:w-full sm:w-[350px]">
          <p className={status.style}>{status.text}</p>
          <div className="flex flex-col md:flex-row">
            <p className="text-6xl mr-6">${data.price}</p>
            {itemOptions}
          </div>
          <p className="mt-4">Time created: {data.time}</p>
        </div>

      </section>
      <Dropdown showWhen={dropdown} />
    </>
  )
}
