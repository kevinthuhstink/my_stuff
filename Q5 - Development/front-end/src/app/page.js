'use client'

import { revalidatePath } from 'next/cache'
import React from 'react'
import Table from './Table.js'
import Form from './Form.js'

async function getData() {
  const res = await fetch('http://localhost:5000/catalog', { method: 'GET' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default function Page() {

  const [data, setData] = React.useState([])
  React.useEffect(() => {
    getData().then(res => {
      setData(res.body)
    })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table data={data} />
      <Form setData={setData} />
    </main>
  );
}
