export default function ColorButton(props) {
  return (
    <button className="setcolors" onClick={props.toggleColors} style={props.style}>
      { props.style.text }
    </button>
  )
}
