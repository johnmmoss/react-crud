import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { IEmployee } from '../IEmployee';

const EmployeeForm = (props: any) => {

    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        const current: IEmployee = {
            employeeID: 0,
            title: title,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthday,
            departmentID: 1
        };
        props.onEmployeeChange(current);
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
                        onChange={e => setFirstName(e.target.value) } placeholder="first name" />
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


export default EmployeeForm;