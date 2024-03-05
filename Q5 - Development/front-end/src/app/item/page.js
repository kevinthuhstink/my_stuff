'use client'

import React from 'react'
import Topbar from '../components/Topbar.js'
import Dropdown from '../components/Dropdown.js'
import Form from './components/Form.js'

export default function Page() {

  const [dropdown, setDropdown] = React.useState(false)
  const mainStyle = "absolute right-0 p-4 overflow-auto h-full "
    + (dropdown ? "w-[calc(100%-200px)]" : "w-full")

  return (
    <>
      <Topbar title="List Item for Sale" dropdown={dropdown} setDropdown={setDropdown} />
      <main className="flex h-[calc(100vh-6rem)] w-full fixed bottom-0">
        <Dropdown showWhen={dropdown} />
        <Form />
      </main>
    </>
  )
}
