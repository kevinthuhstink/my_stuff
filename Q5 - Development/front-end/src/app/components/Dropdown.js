/**
 * props
 *   showWhen: determines when the component should be displayed.
 */
export default function Dropdown(props) {

  if (!props.showWhen)
    return <></>
  return (
    <div className="bg-red-100 h-full w-[200px] p-4 flex flex-col">
      <a href="/" className="mb-4">
        Home Page
      </a>
      <a href="/item" className="">
        List item for sale
      </a>
    </div>
  )
}
