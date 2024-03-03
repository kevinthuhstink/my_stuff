import Item from './Item.js'

export default function CatalogRow(props) {

  var items = []
  if (props.data) {
    items = props.data.filter(props.filter).map(
      elem => <Item key={elem.key} taskDetails={elem} setData={props.setData} />)
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
