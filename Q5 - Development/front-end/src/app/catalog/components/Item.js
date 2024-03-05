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
   * Checks the item id to ensure the same items were removed from display
   * and from the server database.
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

    response.json().then(res => {
      console.log(res)
      if (res.body.id !== props.id)
        throw new Error("Removed item doesn\'t match removed server item")
    })
  }

  /**
   * Formats the time.
   * return: A string representation of the item's time.
   */
  function formatTime() {
    const dateFormat = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "America/New_York"
    }

    const date = new Date(props.time)
    return Intl.DateTimeFormat('en-US', dateFormat).format(date)
  }

  return (
    <div id="task-cell"
      className="p-3 w-[200px] h-[270px] border border-black ml-4 flex-shrink-0
                 flex flex-col rounded shadow-lg">
      <p className="block">{props.name}</p>
      <p className="block">Time: {formatTime()}</p>
      <p className="block">Status: {props.status}</p>
      <button onClick={handleRemove} className="inline-block rounded border-2 border-black bg-gray-400 justify-self-end">
        remove
      </button>
    </div>
  )
}
