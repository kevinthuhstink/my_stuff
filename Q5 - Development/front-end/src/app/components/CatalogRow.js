import Item from './Item.js'

/**
 * Creates one row of items in the catalog.
 * The items that are displayed on this row are determined by the
 * filter function passed into this component.
 *
 * props
 *   data: An array of objects representing catalog items.
 *         Each item in the array should have:
 *         {key: number; name: string; time: number; status: string}
 *   key: Identifier for catalog rows.
 *   setData: A function to change the catalog data.
 *            Unused for this element, but necessary to pass down into
 *            its Item children.
 *   filter: A filter function to determine which items are supposed
 *           to be displayed on this catalog row.
 *           fn: (item: {}) => boolean
 *   header: A title for this row.
 */
export default function CatalogRow(props) {

  var items = []
  if (props.data) {
    items = props.data.filter(props.filter).map(
      elem => <Item id={elem.key} {...elem} setData={props.setData} />)
  }

  return (
    <div className="flex flex-col mb-10">
      <h2 className="text-2xl">{props.header}</h2>
      <div className="flex flex-row overflow-x-auto">
        {items}
      </div>
    </div>
  )
}
