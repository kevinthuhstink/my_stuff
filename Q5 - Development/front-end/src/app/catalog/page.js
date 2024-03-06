'use client'

import React from 'react'
import Topbar from '../components/Topbar.js'
import Dropdown from '../components/Dropdown.js'
import Catalog from './components/Catalog.js'


/**
 * Gets all catalog items from the server.
 */
async function getData() {
  const res = await fetch('http://localhost:5000/catalog', { method: 'GET' })

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

  return (
    <>
      <Topbar title="Catalog" dropdown={dropdown} setDropdown={setDropdown} />
      <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
        <section className={mainStyle}>
          <Catalog data={data} setData={setData} />
        </section>
        <Dropdown showWhen={dropdown} />
      </main>
    </>
  );
}
