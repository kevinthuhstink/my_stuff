/**
 * Individual catalog item component.
 *
 * props
 *   setData: A function to change the catalog data.
 *            Used for removal of catalog items.
 *   key: Identifier for catalog entries.
 *   id: A unique accessible identifier for catalog entries.
 *   name: The catalog item's name.
 *   time: The time the catalog item was created.
 *   status: The status of the catalog item.
 */
export default function ItemListing(props) {

  /**
   * Event handler that removes this item from the database.
   */
  async function handleRemove(event) {
    event.preventDefault()

    props.setData(prevData => prevData.filter(elem => elem.id !== props.id))

    const fetchLink = 'http://localhost:5000/catalog/item/' + props.id
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
      className="p-3 w-[200px] h-[270px] border border-black ml-4 flex-shrink-0
                 flex flex-col rounded shadow-lg">
      <p className="block">Time: {props.time}</p>
      <p className="block">{props.name}</p>
      <p className="block">Status: {props.status}</p>
      <button onClick={handleRemove} className="inline-block rounded border-2 border-black bg-gray-400 justify-self-end">
        remove
      </button>
    </div>
  )
}
