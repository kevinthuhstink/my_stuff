'use client'

import React from 'react'
import Topbar from '../components/Topbar.js'
import Dropdown from '../components/Dropdown.js'

async function getData() {
  const res = await fetch('http://localhost:5000/catalog', { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default function Page() {

  const user = React.useRef()
  const username = React.useRef()
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    user.current = window.sessionStorage.getItem('userid')
    username.current = window.sessionStorage.getItem('username')

    getData().then(res => setData(res.body))
  }, [])

  //React state handler for Dropdown
  const [dropdown, setDropdown] = React.useState(false)

  /**
   * Lists the active listings the user has, or a message telling them to
   * put up their first listing if they have none.
   */
  var listings = data
    .filter(elem => elem.owner === username.current)
    .map(elem => (
      <p key={elem.id} className="text-2xl">
        <a href={"./catalog/" + elem.id} className="text-blue-600 underline">
          {"item id: " + elem.id + ", " + elem.name}
        </a>
      </p>
    ))
  if (listings.length === 0)
    listings = (
      <p>You dont have any items listed on the catalog. List your first item using
        <a href="/item" className="text-blue-600 underline"> this page.</a>
      </p>
        )

  if (user.current === null)
    return (
      <>
        <Topbar title="user page" dropdown={dropdown} setDropdown={setDropdown}/>
        <main className="w-full flex flex-row h-[calc(100%-6rem)] fixed bottom-0">
          <p>
            You aren&apos;t logged into an account yet. Sign up
            <a href="/signup" className="underline text-blue-600"> here </a>
            or log in
            <a href="/login" className="underline text-blue-600"> here </a>
            if you have an account.
          </p>
          <Dropdown showWhen={dropdown} />
        </main>
      </>
    )

  return (
    <>
      <Topbar title={username.current} dropdown={dropdown} setDropdown={setDropdown}/>
      <main className="w-full flex flex-row h-[calc(100%-6rem)] fixed bottom-0">
        <section className="p-8 w-full">
          <p className="text-4xl mb-4">Your current listings:</p>
          {listings}
        </section>
        <Dropdown showWhen={dropdown}/>
      </main>
    </>
  )
}
