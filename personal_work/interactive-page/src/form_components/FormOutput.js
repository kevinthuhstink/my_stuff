export default function FormOutput(props) {
  return (
    <div className="usr--out">
      { props.image ?
        <img className="donut--gif" src={props.image} alt="" /> :
        <p className="out--text">{props.textOut}</p> }
    </div>
  )
}
