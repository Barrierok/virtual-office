import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UsernameContext from './UsernameContext';

export default class Header extends React.PureComponent {
  static contextType = UsernameContext;

  render() {
    const { active } = this.props;
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Brand</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link disabled={active === 'manager'} href="/task">Manager</Nav.Link>
          <Nav.Link disabled={active === 'chat'} href="/chat">Chat</Nav.Link>
          <Nav.Link disabled={active === 'news'} href="/news">News</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown alignRight title={this.context}>
            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
