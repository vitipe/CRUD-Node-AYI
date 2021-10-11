import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import HomePage from './HomePage';
import ItemsPage from './ItemsPage';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">AYI-Node-CRUD</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/items">Items</Nav.Link>
          <Nav.Link href="/api/items">API</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

        <Switch>
          <Route path="/items">
            <ItemsPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
