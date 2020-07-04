import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, Button, Navbar, NavbarBrand, Nav, NavItem, NavLink, Form, FormGroup, Label, Input } from 'reactstrap';
import { IEmployee } from './IEmployee'
import ConfirmModal from './components/ConfirmModal';
import EmployeeForm from './components/EmployeeForm';

function App() {

  const [employees, setEmployees] = useState([] as IEmployee[]);


  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployeeHandler = (employeeID: number) => {
    deleteEmployee(employeeID);
  }

  function loadEmployees() {
    var url = 'https://localhost:44384/api/Employee';
    fetch(url)
      .then(result => result.json())
      .then(data => setEmployees(data))
      .catch(error => console.log(error));
  }

  function addEmployee(employee: IEmployee) {
    var url = 'https://localhost:44384/api/Employee';
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
      .then(() => loadEmployees());
  }

  function deleteEmployee(employeeID: number) {
    var url = 'https://localhost:44384/api/Employee';
    console.log("Deleting" + employeeID);
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({employeeID:employeeID}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => loadEmployees())
  }

  return (
    <div className="App">
      <Navbar color="dark">
        <NavbarBrand href="/">Acme Human Resources</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#">Employees</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Container className="mt-5">
        <Row>
          <h1>Employees</h1>
        </Row>
        <Row className="mt-4">
          <table className="table" cellPadding="2" cellSpacing="2">
            <thead>
              <tr>
                <th>Title</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {
                employees.map(x => <Employee onDeleteClickHandler={deleteEmployeeHandler} key={x.employeeID} data={x} />)
              }
            </tbody>
          </table>
        </Row>
        </Container>
        <Container>
        <Row className="mt-5">
          <h2>Add Employee</h2>
        </Row>
        <Row className="mt-4">
             <EmployeeForm addEmployeeHandler={addEmployee} /> 
        </Row>
      </Container>
    </div>
  );
}

const Employee = (props: any) => (
  <tr>
    <td>{props.data.title}</td>
    <td>{props.data.firstName}</td>
    <td>{props.data.lastName}</td>
    <td>
        <ConfirmModal 
            buttonLabel='Delete'
            title='Confirm Delete'
            text='Are you sure you want to delete employee?' 
            confirmButtonLabel='Delete'
            onConfirm={() => props.onDeleteClickHandler(props.data.employeeID)}/>
      </td>
  </tr>
)

export default App;
