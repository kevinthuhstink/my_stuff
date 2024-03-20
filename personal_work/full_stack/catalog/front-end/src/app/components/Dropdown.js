import React from 'react'

/**
 * Fills the database with random items.
 * Only executable with the admin (root) account
 */
async function fillDB() {
  var response
  const fetchLink = 'http://localhost:5000/filldb'
  try {
    response = await fetch(fetchLink, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: null
    })
  } catch(exception) {
    setRequestStatus("FETCH_FAIL")
    return
  }

  if (!response.ok)
    console.log("server error: db fill failed")
}

/**
 * props
 *   showWhen: determines when the component should be displayed.
 */
export default function Dropdown(props) {

  //Grab user id
  const user = React.useRef()
  const username = React.useRef()
  React.useEffect(() => {
    user.current = window.sessionStorage.getItem('userid')
    username.current = window.sessionStorage.getItem('username')
  }, [])

  //Removes account information from the current browser session.
  function logout() {
    window.sessionStorage.removeItem('userid')
    window.sessionStorage.removeItem('username')
    window.location.href = "/"
  }


  var accountOptions
  const linkStyle = "mb-4 text-xl m-6"
  if (username.current === "root")
    accountOptions = (
      <>
        <a href="/user" className={linkStyle}>See my items</a>
        <p className={linkStyle + " cursor-pointer"} onClick={logout}>Logout</p>
        <p className={linkStyle + " cursor-pointer"} onClick={fillDB}>fill db</p>
      </>
    )

  else if (user.current) {
    accountOptions = (
      <>
        <a href="/user" className={linkStyle}>See my items</a>
        <p className={linkStyle + " cursor-pointer"} onClick={logout}>Logout</p>
      </>
    )
  }

  else
    accountOptions = <></>

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
      {accountOptions}
    </div>
  )
}
