import Topbar from './components/Topbar.js'
import React from 'react'
import Dropdown from './components/Dropdown.js'

export default function Page() {
  return (
    <>
      <div className="w-full h-[120px] bg-red-300">
      </div>
      <main className="flex flex-row h-[calc(100vh-6rem)] w-full fixed bottom-0">
        <div className="flex flex-col w-full overflow-y-auto">
          <h1 className="px-4 pt-20 text-9xl bg-red-100 border-b-8 border-black">
            THE<br/>CATALOG.
          </h1>
          <div className="flex flex-row w-full justify-around my-12">
            <p className="border border-black bg-red-100 rounded text-center
                          p-3 w-[200px]">
              <a href="./catalog">Login</a>
            </p>
            <p className="border border-black bg-red-100 rounded text-center
                          p-3 w-[200px]">
              <a href="./catalog">See our items</a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
