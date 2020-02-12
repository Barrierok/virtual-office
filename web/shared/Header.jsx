import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = ({ title, href }) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href={href}>{title}</Navbar.Brand>
  </Navbar>
);

export default Header;
