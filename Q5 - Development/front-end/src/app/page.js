'use client'

import { revalidatePath } from 'next/cache'
import React from 'react'
import Topbar from './components/Topbar.js'
import Catalog from './components/Catalog.js'
import Form from './components/Form.js'


/**
 * Returns all catalog items from the server.
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

  return (
    <>
      <Topbar />
      <main className="flex flex-col justify-between h-[calc(100vh-6rem)] w-full
                       fixed bottom-0 p-6 overflow-y-auto">
        <Catalog data={data} setData={setData} />
        <Form setData={setData} />
      </main>
    </>
  );
}
