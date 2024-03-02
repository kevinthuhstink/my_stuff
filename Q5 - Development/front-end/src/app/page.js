import { revalidatePath } from 'next/cache'
import Table from './Table.tsx'

async function getData() {
  revalidatePath('http://localhost:5000/catalog')
  const res = await fetch('http://localhost:5000/catalog')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()
  console.log(data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table data={data.body} />
    </main>
  );
}
