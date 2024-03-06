import Topbar from './components/Topbar.js'
import React from 'react'
import Dropdown from './components/Dropdown.js'

export default function Page() {
  return (
    <>
      <div className="w-full h-[120px] bg-red-300">
      </div>
      <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
        <div className="flex flex-col w-full">
          <h1 className="p-4 pt-20 text-9xl bg-red-100 border-b-8 border-black">
            THE<br/>CATALOG.
          </h1>
          <p className="place-self-center border border-black bg-red-100 rounded
                        p-3 mt-12">
            <a href="./catalog">See our items</a>
          </p>
        </div>
      </main>
    </>
  )
}
