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

  const [data, setData] = React.useState({})
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

        time: formatTime()
      })

    })
  }, [params.params.item])


  /**
   * Sets any success/failure messages if there are any errors
   * with user input
   */
  function setRequestStatus() {
      switch (currStatus) {
        case "SUCCESS":
          setStatus(prevStatus => ({
            text: "Removal successful",
            style: "text-lime-600",
          }))
          break

        case "FETCH_FAIL":
          setStatus(prevStatus => ({
            text: "Failed to send request to server, come back later",
            style: "text-red-500",
          }))
          break

        case "REMOVE_FAIL":
          setStatus(prevStatus => ({
            text: "Server error during item removal",
            style: "text-red-500",
          }))
          break

        case "NO_USER":
          setStatus(prevStatus => ({
            text:
              <p>
                You need to be logged in to purchase items. Sign up
                  <a href="/signup" className="underline text-blue-600"> here </a>
                or log in
                  <a href="/login" className="underline text-blue-600"> here </a>
                if you have an account.
              </p>,
            style: "text-red-500",
          }))
          break

        default:
          setStatus(prevStatus => ({
            text: "Unknown error occurred",
            style: "text-red-500",
          }))
      }
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
      setFormStatus("FETCH_FAIL")
      return
    }

    response.json().then(res => {
      if (res.body.id !== data.id) {
        setFormStatus("REMOVE_FAIL")
        return
      }
      setFormStatus("SUCCESS")
      window.location.href = "/catalog"
    })
  }


  /**
   * If a user is the seller for an item, give them the option to
   * put the item on sale.
   * User chooses a new price to set the item to, less than the original price.
   */
  async function setSale() {
    event.preventDefault()

    const fetchLink = 'http://localhost:5000/item/' 
    const response = await fetch(fetchLink, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: null
    })

    if (!response.ok) {
      setFormStatus("FETCH_FAIL")
      return
    }

    response.json().then(res => {
      setFormStatus("SUCCESS")
      setData(prevData => {

      })
    })
  }

  //Have different item options for the seller and other users
  var itemOptions
  if (data.owner === username.current)
    itemOptions = (
      <>
        <button
          onClick={handleRemove}
          className="p-4 bg-red-100 rounded border border-black mr-8">
          Remove Item
        </button>
        <form
          onSubmit={setSale}
          className="p-4 bg-red-100 rounded border border-black ">
          <label>Put on sale</label>
          <input/>
        </form>
      </>
    )

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
      <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
        <section className="flex flex-col h-full w-full justify-between p-8">

          <div>
            <p className="mb-6 text-2xl">Seller: {data.owner}</p>
            <p>Description:<br/>{data.description}</p>
          </div>

          <div className="w-full">
            <p className={status.style}>{status.text}</p>
            <div className="flex flex-row">
              <p className="text-6xl mr-6">${data.price}</p>
              {itemOptions}
            </div>
            <p className="mt-4">Time created: {data.time}</p>
          </div>

        </section>
        <Dropdown showWhen={dropdown} />
      </main>
    </>
  )
}
