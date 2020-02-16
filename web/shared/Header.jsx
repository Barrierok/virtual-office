import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UsernameContext from './UsernameContext';
import badBoys from './badboyslogo2.png';

export default class Header extends React.PureComponent {
  static contextType = UsernameContext;

  render() {
    const { active } = this.props;
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">
          <img src={badBoys} alt="Плохие парни юнайтед" height="50px" width="60px" />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link disabled={active === 'tasks'} href="/tasks">Задачи</Nav.Link>
          <Nav.Link disabled={active === 'chat'} href="/chat">Чат</Nav.Link>
          <Nav.Link disabled={active === 'news'} href="/news">Новости</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown alignRight title={this.context}>
            <NavDropdown.Item href="/logout">Выйти</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
