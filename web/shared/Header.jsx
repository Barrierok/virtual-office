import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import UsernameContext from './UsernameContext';

export default class Header extends React.PureComponent {
  static defaultProps = {
    bg: 'primary',
  };

  static contextType = UsernameContext;

  render() {
    const { active, bg } = this.props;
    return (
      <Navbar bg={bg} variant="dark">
        <Navbar.Brand href="/">
          L
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link disabled={active === 'tasks'} href="/tasks">Задачи</Nav.Link>
          <Nav.Link disabled={active === 'chat'} href="/chat">Чат</Nav.Link>
          <Nav.Link disabled={active === 'news'} href="/news">Новости</Nav.Link>
        </Nav>
        <Nav>
          {this.context && (
            <NavDropdown alignRight title={this.context}>
              <NavDropdown.Item href="/logout">Выйти</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar>
    );
  }
}
