import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import { IEmployee } from './IEmployee'

function App() {

  const [employees, setEmployees] = useState([] as IEmployee[]);

  useEffect(() => {
    var url =  'https://localhost:44388/api/Employee';

    fetch(url)
      .then(result => result.json())
      .then(data => setEmployees(data));
  });

  return (
    <div className="App">
      <h2>Human Resources</h2>
      <table cellPadding="2" cellSpacing="2">
        { employees.map( x => <Employee data={x} />)}
      </table>
    </div>
  );
}

const Employee = (props:any) => (
  <div>
      <tr>
        <td>{props.data.title}</td>
        <td>{props.data.firstName}</td>
        <td>{props.data.lastName}</td>
      </tr>
  </div>
)
export default App;
