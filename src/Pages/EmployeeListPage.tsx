import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ModalFooter, ModalBody, ModalHeader, Modal, Alert, Spinner } from 'reactstrap';
import { IEmployee } from '../IEmployee'
import ConfirmModal from '../components/ConfirmModal';
import EmployeeAddEditForm from '../components/EmployeeAddEditForm';

function EmployeeListPage() {

    const [apiError, setApiError] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [employees, setEmployees] = useState([] as IEmployee[]);
    // One EmployeeForm control used twice on the page, once for add and once for edit
    // Each instance of EmployeeForm has is in its own modal popup 
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    // updatedEmployee is used by both add and edit to track changes made in the modal popups
    // employeeChangedHandler is used by BOTH modals to setUpdatedEmployee.
    const [updatedEmployee, setUpdatedEmployee] = useState({} as IEmployee);
    const [currentEmployee, setCurrentEmployee] = useState({} as IEmployee);


    useEffect(() => {
        loadEmployees();
    }, []);

    const toggleAddModal = (employee?: IEmployee) => {
        setCurrentEmployee({} as IEmployee);
        setShowAddModal(!showAddModal);
    }

    const toggleEditModal = (employee?: IEmployee) => {
        if (employee !== undefined) {
            setCurrentEmployee(employee);
        }
        setShowEditModal(!showEditModal);
    }

    const employeeChangedHandler = (updatedEmployee: IEmployee) => {
        setUpdatedEmployee(updatedEmployee);
    }

    const deleteEmployeeHandler = (employeeID: number) => {
        deleteEmployee(employeeID);
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
        var url = 'https://localhost:44384/api/Employee';
        var bodyText = JSON.stringify(employee);
        fetch(url, {
            method: 'POST',
            body: bodyText,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => console.log(res))
            .then(() => loadEmployees())
    }

    function deleteEmployee(employeeID: number) {
        var url = 'https://localhost:44384/api/Employee';
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({ employeeID: employeeID }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => loadEmployees())
    }

    return (
        <>
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
                                                toggleModal={toggleEditModal}
                                                onDeleteClickHandler={deleteEmployeeHandler} />)
                                        }
                                    </tbody>
                                </table>
                            </Row>
                            <Row className="mt-4">
                                <Button color="primary" onClick={() => toggleAddModal()}>Add New Employee</Button>
                                <Modal isOpen={showAddModal} toggle={() => toggleAddModal()} className="one">
                                    <ModalHeader toggle={() => toggleAddModal()}>Add Employee</ModalHeader>
                                    <ModalBody>
                                        <EmployeeAddEditForm onEmployeeChanged={employeeChangedHandler} current={currentEmployee} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={() => { addEmployee(updatedEmployee); toggleAddModal(); }}>Save</Button>{' '}
                                        <Button color="secondary" onClick={() => toggleAddModal()}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                                <Modal isOpen={showEditModal} toggle={() => toggleEditModal()} className="one">
                                    <ModalHeader toggle={() => toggleEditModal()}>Edit Employee</ModalHeader>
                                    <ModalBody>
                                        <EmployeeAddEditForm onEmployeeChanged={employeeChangedHandler} current={currentEmployee} />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={() => { updateEmployee(updatedEmployee); toggleEditModal(); }}>Save</Button>{' '}
                                        <Button color="secondary" onClick={() => toggleEditModal()}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </Row>
                        </>
                }
            </Container>
        </>
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

export default EmployeeListPage;
