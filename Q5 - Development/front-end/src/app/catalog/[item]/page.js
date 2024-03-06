'use client'

import Topbar from '../../components/Topbar.js'
import React from 'react'

export default function Page(params) {

  const [dropdown, setDropdown] = React.useState(false)
  const mainStyle = "p-4 overflow-auto h-full "
    + (dropdown ? "w-[calc(100%-200px)]" : "w-full")

  return (
    <>
      <Topbar title={params.params.item} dropdown={dropdown} setDropdown={setDropdown} />
    </>
  )
}
