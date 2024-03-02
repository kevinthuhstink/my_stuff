import TableRow from './TableRow.js'

export default function Table(props) {

  var tableRows
  if (props.data) {
    tableRows = props.data.map(
      elem => <TableRow key={elem.key} taskDetails={elem} />)
  }

  return (
    <table>
      <caption>
        Taskmaster
      </caption>

      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
       {tableRows}
      </tbody>
    </table>
  )
}
