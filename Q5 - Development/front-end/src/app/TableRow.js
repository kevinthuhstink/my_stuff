export default function TableRow(props) {
  const { time, task, status } = props.taskDetails;
  return (
    <tr>
      <td>{time}</td>
      <td>{task}</td>
      <td>{status}</td>
    </tr>
  )
}
