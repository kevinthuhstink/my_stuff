import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "./styles/Divider.scss"

export function Divider({ hide=false }) {
  return (
    <div id="divider-container">
      { hide ? <FaChevronRight /> : <FaChevronLeft /> }
      <div id="divider" style={ hide ? {} : { right: 0 } }>
      </div>
    </div>
  )
}
