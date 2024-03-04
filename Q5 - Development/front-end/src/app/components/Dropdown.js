/**
 * props
 *   showWhen: determines when the component should be displayed.
 */
export default function Dropdown(props) {

  if (!props.showWhen)
    return <></>
  return (
    <div className="absolute bg-red-100 bottom-0 left-0 h-full w-[200px]">
    </div>
  )
}
