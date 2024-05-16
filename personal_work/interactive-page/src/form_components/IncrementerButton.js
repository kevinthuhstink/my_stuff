export default function IncrementerButton(props) {
  return (
    <div className="usr--clicky"
      onClick={props.handleIncrement}
      style={props.buttonStyle}>
      <p className="display--clicky" style={props.textColors}>{props.count}</p>
    </div>
  )
}
