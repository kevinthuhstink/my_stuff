export default function IncrementerButton(props) {
  return (
    <div className="usr--clicky"
      onClick={props.handleIncrememnt}
      style={props.buttonStyle}>
      <p className="display--clicky" style={props.textColors}>{props.value}</p>
    </div>
  )
}
