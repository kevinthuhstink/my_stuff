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
  const res = await fetch('http://localhost:5000/catalog')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
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
    })
  }, [])

  const [dropdown, setDropdown] = React.useState(false)
  const mainStyle = "p-4 overflow-auto h-full "
    + (dropdown ? "w-[calc(100%-200px)]" : "w-full")

  if (data.length === 0)
    return (
      <>
        <Topbar title="Catalog" dropdown={dropdown} setDropdown={setDropdown} />
        <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
          <p className="text-4xl p-8 w-full">
            No items currently in the catalog.<br/>Be the first to list an item
            <a href='/item' className="text-blue-600 underline"> here.</a>
          </p>
          <Dropdown showWhen={dropdown} />
        </main>
      </>
    )

  return (
    <>
      <Topbar title="Catalog" dropdown={dropdown} setDropdown={setDropdown} />
      <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
        <section className="flex flex-row h-full w-full fixed">
          <Catalog data={data} setData={setData} />
        </section>
        <Dropdown showWhen={dropdown} />
      </main>
    </>
  )
}
