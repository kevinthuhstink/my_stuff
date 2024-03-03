import ItemListing from './ItemListing.js'

export default function Catalog(props) {

  const tableCells = "inline-block"

  var tableRows = []
  if (props.data) {
    tableRows = props.data.map(
      elem => <ItemListing key={elem.key} taskDetails={elem} setData={props.setData} />)
  }

  return (
    <>
      <h1 className="text-xl">Catalog</h1>

      <div className="flex flex-row w-full overflow-x-auto">
        {tableRows}
      </div>
    </>
  )
}
