import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "./styles/Divider.scss"

export function Divider({ hide=false }) {
  return (
    <div id="divider-container" style={ hide ? { right: 0 } : {} }>
      { hide ? <FaChevronLeft /> : <FaChevronRight /> }
      <div id="divider">
      </div>
    </div>
  )
}
