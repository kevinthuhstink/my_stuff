'use client'

import Topbar from './components/Topbar.js'
import React from 'react'
import Dropdown from './components/Dropdown.js'

export default function Page() {

  const [dropdown, setDropdown] = React.useState(false)
  const mainStyle = "p-4 overflow-auto h-full "
    + (dropdown ? "w-[calc(100%-200px)]" : "w-full")

  return (
    <>
      <Topbar title="" dropdown={dropdown} setDropdown={setDropdown} />
      <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
        <div className="flex flex-col w-full">
          <h1 className="p-4 pt-20 text-9xl bg-red-100">
            THE<br/>CATALOG.
          </h1>
          <button className="place-self-center border border-black bg-red-100 rounded
                             p-3 mt-12">
            See our items
          </button>
        </div>
        <Dropdown showWhen={dropdown} />
      </main>
    </>
  )
}
