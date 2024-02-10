/* put up a fake registration screen
 * ask for username, password, confirm password
 * radio button to confirm if you are KC
 *  if yes, have header say kevinthuhstink
 *  otherwise have it say Kevin Cheng
 * on button press/form submission redirect to main page
 * data collection should be done with state in Page.js
 * css: take the "default" styles
*/

//handleChange func needs to come from the props
export default function FakeLogin( props ) {
  var validSubmit = props.data.passwordConfirm === props.data.password;
  const styles =
    {
      borderColor: !validSubmit ? "red" : ""
    };

  return (
    <form className="fake--form">
      <fieldset className="fake--fields">
        <legend>Please Register Below:</legend>
        <input
          className="text--in"
          type="text"
          name="username"
          value={props.data.username}
          onChange={props.handleChange}
          placeholder="Username" /><br />
        <input
          className="text--in"
          type="password"
          name="password"
          value={props.data.password}
          onChange={props.handleChange}
          placeholder="Password"
          style={styles} /><br />
        <input
          className="text--in"
          type="password"
          name="passwordConfirm"
          value={props.data.passwordConfirm}
          onChange={props.handleChange}
          placeholder="Confirm Password"
          style={styles} /><br />
        { !validSubmit &&
            <small className="invalidPassword">Passwords must match<br /></small> }
        <input
          type="checkbox"
          id="KC"
          name="KC"
          onChange={props.handleChange}
          checked={props.data.KC} />
        <label htmlFor="isKC">kevinthuhstink?</label>
      </fieldset>
      <button onClick={props.handleSubmit}>Submit</button>
    </form>
  )
}
