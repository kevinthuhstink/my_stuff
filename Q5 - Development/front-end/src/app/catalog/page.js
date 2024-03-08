'use client'

import React from 'react'
import Topbar from '../components/Topbar.js'
import Dropdown from '../components/Dropdown.js'
import Catalog from './components/Catalog.js'


/**
 * Gets all catalog items from the server,
 * and user information if there was a successful login.
 */
async function getData() {
  var res
  try {
    res = await fetch('http://localhost:5000/catalog', { cache: 'no-store' })
  } catch(exception) {
    res.reject()
  }

  if (!res.ok)
    res.reject()
  return res.json()
}

/**
 * On page load, sends a request to get all catalog items from the server, and
 * passes that data into its children.
 */
export default function Page() {

  const [data, setData] = React.useState([])
  React.useEffect(() => {

    getData().then(res => {
      console.log(res.body)
      setData(res.body)

    }).catch(rej => {
      setData("NETWORK_ERROR")
    })
  }, [])

  const [dropdown, setDropdown] = React.useState(false)

  var main
  if (data === "NETWORK_ERROR")
    main = (
      <p className="text-4xl p-8 w-full">
        Server unavailable at this time.<br/>Please return later.
      </p>
    )

  else if (data.length === 0)
    main = (
      <p className="text-4xl p-8 w-full">
        No items currently in the catalog.<br/>Be the first to list an item
        <a href='/item' className="text-blue-600 underline"> here.</a>
      </p>
    )

  else
    main = (
      <section className="flex flex-row h-full w-full p-8">
        <Catalog data={data} setData={setData} />
      </section>
    )

  return (
    <>
      <Topbar title="Catalog" dropdown={dropdown} setDropdown={setDropdown} />
      <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
        {main}
        <Dropdown showWhen={dropdown} />
      </main>
    </>
  )
}
