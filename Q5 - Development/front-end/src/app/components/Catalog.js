import CatalogRow from './CatalogRow.js'

/**
 * The catalog of items.
 * Contains multiple rows, each of which filters some items out from
 * being displayed.
 *
 * props
 *   data: An array of objects representing catalog items.
 *         Each item in the array should have:
 *         {id: number; name: string; time: number; status: string}
 *   setData: A function to change the catalog data.
 *            Unused for this element, but necessary to pass down into
 *            its Item children.
 */
export default function Catalog(props) {

  const rowSetup = [
      {
        id: 0,
        header: "All Items",
        filter: item => true
      },
      {
        id: 1,
        header: "Status: incomplete",
        filter: item => item.status === "incomplete"
      }
    ]

  var rows = []
  if (props.data) {
    rows = rowSetup.map(
      elem => <CatalogRow key={elem.id} {...elem} data={props.data} setData={props.setData} />)
  }

  return (
    <>
      <div className="flex flex-col w-full">
        {rows}
      </div>
    </>
  )
}
