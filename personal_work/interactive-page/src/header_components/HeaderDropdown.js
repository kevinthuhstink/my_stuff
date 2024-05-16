export default function HeaderDropdown(props) {
  const mainVersionCount = 6;
  var mainSelectors = [];
  for (var mainVer = 0; mainVer < mainVersionCount; mainVer++) {
    var mainSelect = props.selectMainVersion.bind(null, mainVer);
    mainSelectors.push(mainSelect);
  }
  return (
    <div className={props.active ? "dropdown active" : "dropdown"} style={props.colors}>
      <h1 className="dropdown--title">Projects:</h1>
      <ol className="dropdown--select">
        <p onClick={mainSelectors[0]}>Hello Everyone!</p>
        <li onClick={mainSelectors[1]}>CSS Review</li>
        <li onClick={mainSelectors[2]}>Reusable Components</li>
        <li onClick={mainSelectors[3]}>Interactive Components</li>
        <li onClick={mainSelectors[4]}>Game of Life</li>
        <li onClick={mainSelectors[5]}>Notes App</li>
      </ol>
    </div>
  )
}
