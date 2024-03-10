'use client'

import React from 'react'
import Topbar from '../components/Topbar.js'
import Dropdown from '../components/Dropdown.js'
import Form from './components/Form.js'

export default function Page() {

  //React state handler for Dropdown
  const [dropdown, setDropdown] = React.useState(false)

  return (
    <>
      <Topbar title="List Item for Sale" dropdown={dropdown} setDropdown={setDropdown} />
      <Form />
      <Dropdown showWhen={dropdown} />
    </>
  )
}
