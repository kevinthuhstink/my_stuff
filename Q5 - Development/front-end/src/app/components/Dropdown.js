import React from 'react'

/**
 * props
 *   showWhen: determines when the component should be displayed.
 */
export default function Dropdown(props) {

  const user = React.useRef(sessionStorage.getItem('userid'))

  //create links for recently viewed items and item listings


  if (!props.showWhen)
    return <></>
  return (
    <div className="bg-red-100 h-full p-4 flex flex-col float-right overflow-y-auto
                    md:w-[20%] md:static sm:absolute sm:w-full">
      <a href="/" className="mb-4 text-xl m-6">Home Page</a>
      <a href="/signup" className="mb-4 text-xl m-6">Signup Page</a>
      <a href="/login" className="mb-4 text-xl m-6">Login Page</a>
      <a href="/catalog" className="mb-4 text-xl m-6">Catalog</a>
      <a href="/item" className="text-xl m-6">List item for sale</a>
    </div>
  )
}
