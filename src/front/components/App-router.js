import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import HomePage from './HomePage.js';
import ItemsPage from './ItemsPage.js';

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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
