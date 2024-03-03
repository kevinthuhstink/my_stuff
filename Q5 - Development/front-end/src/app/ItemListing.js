export default function ItemListing(props) {
  const { key, time, task, status } = props.taskDetails;

  async function handleRemove(event) {
    event.preventDefault()

    props.setData(prevData => prevData.filter(elem => elem.key != key))

    const fetchLink = 'http://localhost:5000/catalog/item/' + key
    console.log(fetchLink)
    const response = await fetch(fetchLink, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: null
    })

    if (!response.ok)
      throw new Error('Failed to DELETE item')
  }

  return (
    <div id="task-cell"
      className="p-3 w-[150px] border border-black ml-2 flex-shrink-0 rounded
                 flex flex-col">
      <p className="block">Time: {time}</p>
      <p className="block">{task}</p>
      <p className="block">Status: {status}</p>
      <button onClick={handleRemove} className="inline-block rounded border-2 border-black bg-gray-400 justify-self-end">
        remove
      </button>
    </div>
  )
}
