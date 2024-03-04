import Image from 'next/image'

/**
 * props
 *   dropdown: React state for displaying the dropdown menu
 */
export default function Topbar(props) {

  const handleDropdown = () => props.setDropdown(prevDropdown => !prevDropdown)
  const menuIcon = props.dropdown ? "/menu-hide.svg" : "/menu-show.svg"
  const menuAlt = props.dropdown ? "HIDE" : "SHOW"

  return (
    <div className="fixed top-0 w-full h-24 p-4 flex items-center bg-red-300">
      <Image src={menuIcon} width={64} height={64} alt={menuAlt} onClick={handleDropdown} />
      <h1 className="text-4xl ml-4">Catalog System</h1>
    </div>
  )
}
