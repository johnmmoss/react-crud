import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, Button, Navbar, NavbarBrand, Nav, NavItem, NavLink, ModalFooter, ModalBody, ModalHeader, Modal, Alert, Spinner } from 'reactstrap';
import { IEmployee } from './IEmployee'
import ConfirmModal from './components/ConfirmModal';
import EmployeeForm from './components/EmployeeForm';

function App() {

  const [apiError, setApiError] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [employees, setEmployees] = useState([] as IEmployee[]);
  const [updatedEmployee, setUpdatedEmployee] = useState({} as IEmployee);
  const [currentEmployee, setCurrentEmployee] = useState({} as IEmployee);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  const toggleModal = (employee?: IEmployee) => {
    if (employee !== undefined) {
      setCurrentEmployee(employee);
    } else {
      setCurrentEmployee({} as IEmployee);
    }
    setShowModal(!showModal);
  }

  const deleteEmployeeHandler = (employeeID: number) => {
    deleteEmployee(employeeID);
  }

  const employeeChangedHandler = (updatedEmployee: IEmployee) => {
    setUpdatedEmployee(updatedEmployee);
  }

  const employeeSaveHandler = () => {
    if (updatedEmployee.employeeID === 0) {
      addEmployee(updatedEmployee);
    } else {
      updateEmployee(updatedEmployee);
    }
  }

  function loadEmployees() {
    var url = 'https://localhost:44384/api/Employee';
    fetch(url)
      .then(result => result.json())
      .then(data => setEmployees(data))
      .catch(error => {
        setApiError(true);
        console.log(error)
      })
      .finally(() => setLoadingData(false));
  }

  function addEmployee(employee: IEmployee) {
    var url = 'https://localhost:44384/api/Employee';
    var bodyText = JSON.stringify(employee);
    fetch(url, {
      method: 'PUT',
      body: bodyText,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => console.log(res))
      .then(() => loadEmployees())
      .catch(error => console.error('Error:', error));
  }

  function updateEmployee(employee: IEmployee) {
    console.log("Updating Employee...");
    console.log(employee);
  }

  function deleteEmployee(employeeID: number) {
    var url = 'https://localhost:44384/api/Employee';
    console.log("Deleting" + employeeID);
    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({ employeeID: employeeID }),
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
          <Col>
            <h1>Employees</h1>
          </Col>
        </Row>
      </Container>

      <Container>

        {loadingData ?

          <Row className="mt-4">
            <Col>
              <Spinner color="info" />
            </Col>
          </Row>

          :

          apiError ?

            <Row className="mt-4">
              <Col>
                <Alert color="danger">There was a problem connecting to the server</Alert>
              </Col>
            </Row>

            :

            <>
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
                      employees.map(x => <Employee
                        key={x.employeeID}
                        data={x}
                        toggleModal={toggleModal}
                        onDeleteClickHandler={deleteEmployeeHandler} />)
                    }
                  </tbody>
                </table>
              </Row>
              <Row className="mt-4">
                <Button color="primary" onClick={() => toggleModal()}>Add New Employee</Button>
                <Modal isOpen={showModal} toggle={() => toggleModal()} className="one">
                  <ModalHeader toggle={() => toggleModal()}>Add Employee</ModalHeader>
                  <ModalBody>
                    <EmployeeForm onEmployeeChanged={employeeChangedHandler} current={currentEmployee} />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => { employeeSaveHandler(); toggleModal(); }}>Save</Button>{' '}
                    <Button color="secondary" onClick={() => toggleModal()}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </Row>
            </>
        }
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
      <Button color="primary" onClick={() => props.toggleModal(props.data)}>Edit</Button>
      &nbsp;
      <ConfirmModal
        buttonLabel='Delete'
        title='Confirm Delete'
        text='Are you sure you want to delete employee?'
        confirmButtonLabel='Delete'
        onConfirm={() => props.onDeleteClickHandler(props.data.employeeID)} />
    </td>
  </tr>
)

export default App;
