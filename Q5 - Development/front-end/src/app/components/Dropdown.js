/**
 * props
 *   showWhen: determines when the component should be displayed.
 */
export default function Dropdown(props) {

  if (!props.showWhen)
    return <></>
  return (
    <div className="bg-red-100 h-full w-[200px] p-4 flex flex-col float-right
                    sm:fixed sm:w-full">
      <a href="/" className="mb-4 sm:text-xl sm:m-6">
        Home Page
      </a>
      <a href="/catalog" className="mb-4 sm:text-xl sm:m-6">
        Catalog
      </a>
      <a href="/item" className="sm:text-xl sm:m-6">
        List item for sale
      </a>
    </div>
  )
}
