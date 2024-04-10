import { useContext } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { DisplayContext } from "@/contexts/DisplayContext"
import "./styles/Divider.scss"

export function Divider() {
  const { display, setDisplay } = useContext(DisplayContext)

  function toggleSidebar() {
    setDisplay({
      ...display,
      hideSidebar: !display.hideSidebar
    })
  }

  return (
    <div id="divider-container" style={ display.hideSidebar ? { right: 0 } : {} }>
      { display.hideSidebar ?
        <FaChevronLeft onClick={toggleSidebar} /> :
        <FaChevronRight onClick={toggleSidebar} /> }
      <div id="divider">
      </div>
    </div>
  )
}
