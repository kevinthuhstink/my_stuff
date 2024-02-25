export default function FakeFormOutput(props) {
  return (
    <div className="fakeform--out">
      <p>Username: {props.formData.username}</p>
      <p>Password: {props.formData.password}</p>
      <button onClick={props.retakeForm}>Retake Form</button>
    </div>
  )
}
