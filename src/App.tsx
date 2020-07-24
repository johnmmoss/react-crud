import React from 'react';
import './App.css';
import { Navbar, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap'
import EmployeeListPage from './Pages/EmployeeListPage';
import { Route, Switch, NavLink } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NotFoundPage from './Pages/NotFoundPage';
import AboutPage from './Pages/AboutPage';
import DepartmentListPage from './Pages/DepartmentListPage';

function App() {

  return (
    <div className="App">
      <nav className="header">
        <Container>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/employees'>Employees</NavLink>
          <NavLink to='/departments'>Departments</NavLink>
          <NavLink to='/about'>About</NavLink>
        </Container>
      </nav>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/employees" component={EmployeeListPage} />
        <Route path="/departments" component={DepartmentListPage} />
        <Route path="/About" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div >

  );
}

export default App;
