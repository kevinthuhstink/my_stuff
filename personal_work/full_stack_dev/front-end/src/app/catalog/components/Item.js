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
 *   status: The status of the catalog item (on sale, no status, etc.).
 */
export default function Item(props) {

  function redirect() {
    window.location.href = "http://localhost:3000/catalog/" + props.id
  }

  return (
    <div
      onClick={redirect}
      className="p-3 w-[200px] h-[270px] border border-black ml-4 flex-shrink-0
                 flex flex-col justify-between rounded shadow-lg cursor-pointer">
      <div className="w-full">
        <p className="block mb-4 text-2xl overflow-hidden text-ellipsis">
          {props.name}
        </p>
        <p className="overflow-hidden text-ellipsis">
          {props.description}
        </p>
      </div>
      <div className="w-full">
        <p className="block text-4xl">
          ${props.price}
        </p>
        <button
          className="inline-block rounded border-2 border-black
                     bg-gray-400 justify-self-end w-full p-2">
          Purchase
        </button>
      </div>
    </div>
  )
}
