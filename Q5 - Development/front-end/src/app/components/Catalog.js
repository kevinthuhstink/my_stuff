import CatalogRow from './CatalogRow.js'

/**
 * Creates a catalog of items by creating rows of items
 */
export default function Catalog(props) {

  const rowSetup = [
      {
        key: 0,
        header: "All Items",
        filter: item => true
      },
      {
        key: 1,
        header: "Status: incomplete",
        filter: item => item.status === "incomplete"
      }
    ]

  var rows = []
  if (props.data) {
    rows = rowSetup.map(
      elem => <CatalogRow key={elem.key} {...elem} data={props.data} setData={props.setData} />)
  }

  return (
    <>
      <div className="flex flex-col w-full">
        {rows}
      </div>
    </>
  )
}
