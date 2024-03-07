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

  const [dropdown, setDropdown] = React.useState(false)
  const mainStyle = "p-4 overflow-auto h-full "
    + (dropdown ? "w-[calc(100%-200px)]" : "w-full")

  const [data, setData] = React.useState({})

  /**
   * Initializes item data for display.
   */
  React.useEffect(() => {
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
            <div className="flex flex-row">
              <p className="text-6xl mr-6">${data.price}</p>
              <button className="p-4 bg-red-100 rounded border border-black">
                Purchase
              </button>
            </div>
            <p className="mt-4">Time created: {data.time}</p>
          </div>
        </section>
        <Dropdown showWhen={dropdown} />
      </main>
    </>
  )
}
