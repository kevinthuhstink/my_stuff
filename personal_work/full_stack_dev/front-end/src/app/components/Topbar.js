import Image from 'next/image'
import menuIcon from './menu.png'

/**
 * props
 *   dropdown: React state for displaying the dropdown menu
 *   setDropdown: Sets whether the dropdown menu is displayed or not.
 *   title: Title for the page
 */
export default function Topbar(props) {

  if (props.NO_MENU)
    return (
      <div className="w-full h-24 bg-red-300">
        <h1 className="text-4xl ml-4">{props.title}</h1>
      </div>
    )

  const toggleDropdown = () => props.setDropdown(prevDropdown => !prevDropdown)
  const menuAlt = props.dropdown ? "HIDE" : "SHOW"

  return (
    <div className="fixed top-0 w-full h-24 p-4 flex justify-between items-center bg-red-300">
      <h1 className="text-4xl ml-4">{props.title}</h1>
      <Image src={menuIcon.src} width={64} height={64} onClick={toggleDropdown} alt={menuAlt} className="cursor-pointer" />
    </div>
  )
}
