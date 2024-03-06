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
  const res = await fetch('http://localhost:5000/catalog/' + id, { method: 'GET' })

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
  React.useEffect(() => {
    getItem(params.params.item).then(res => {
      console.log(res.body)
      setData(res.body)
    })
  }, [params.params.item])

  return (
    <>
      <Topbar title={data.name} dropdown={dropdown} setDropdown={setDropdown} />
      <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
        <div className="float-bottom">
          <p className="text-6xl">${data.price}</p>
        </div>
        <Dropdown showWhen={dropdown} />
      </main>
    </>
  )
}
