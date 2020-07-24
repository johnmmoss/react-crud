import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { IEmployee } from '../IEmployee';
import moment from 'moment'

const EmployeeAddEditForm = (props: any) => {

    const [title, setTitle] = useState(props.current.title !== undefined ? props.current.title : '');
    const [employeeID, setEmployeeID] = useState(props.current.employeeID !== undefined ? props.current.employeeID : 0);
    const [firstName, setFirstName] = useState(props.current.firstName !== undefined ? props.current.firstName : '');
    const [lastName, setLastName] = useState(props.current.lastName !== undefined ? props.current.lastName : '');
    const [birthday, setBirthday] = useState(props.current.birthDate !== undefined ? moment(props.current.birthDate).format('YYYY-MM-DD') : '');

    useEffect(() => {
        const updatedEmployee: IEmployee = {
            employeeID: employeeID,
            title: title,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthday,
            departmentID: 1
        };
        console.log(updatedEmployee);
        props.onEmployeeChanged(updatedEmployee);
    }, [title, firstName, lastName, birthday])

    return (
        <Form>
            <FormGroup row>
                <Label for="title" sm={4}>Title</Label>
                <Col sm={8}>
                    <Input type="text" name="title" id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)} placeholder="title" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="firstName" sm={4}>First Name</Label>
                <Col sm={8}>
                    <Input type="text" name="firstName" id="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)} placeholder="first name" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="lastName" sm={4}>Last Name</Label>
                <Col sm={8}>
                    <Input type="text" name="lastName" id="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)} placeholder="last name" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="birthday" sm={4}>Birthday</Label>
                <Col sm={8}>
                    <Input type="date" name="birthday" id="birthday"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)} placeholder="brithday" />
                </Col>
            </FormGroup>
        </Form>
    )
}

export default EmployeeAddEditForm;