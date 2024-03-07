import React from 'react'

/**
 * props
 *   showWhen: determines when the component should be displayed.
 */
export default function Dropdown(props) {

  //Grab user id
  const user = React.useRef()
  React.useEffect(() => {
    user.current = window.sessionStorage.getItem('userid')
  }, [])

  const linkStyle = "mb-4 text-xl m-6"

  var profileOptions = <></>
  if (user.current) {
    profileOptions = (
      <>
        <a href="/user" className={linkStyle}>See my items</a>
      </>
    )
  }

  if (!props.showWhen)
    return <></>
  return (
    <div className="bg-red-100 h-full p-4 flex flex-col float-right overflow-y-auto
                    md:w-[20%] md:static sm:absolute sm:w-full">
      <a href="/" className="mb-4 text-xl m-6">Home Page</a>
      <a href="/signup" className={linkStyle}>Signup Page</a>
      <a href="/login" className={linkStyle}>Login Page</a>
      <a href="/catalog" className={linkStyle}>Catalog</a>
      <a href="/item" className={linkStyle}>List item for sale</a>
      {profileOptions}
    </div>
  )
}
