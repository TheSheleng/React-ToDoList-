import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Offcanvas, Nav, Container } from 'react-bootstrap';

import Home from "./pages/Home";
import EditTask from "./pages/EditTask";
import EditCategory from "./pages/EditCategory";
import EditTag from "./pages/EditTag";
import CreateTask from "./pages/CreateTask";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar bg="light-subtle" fixed="top" expand={false}>
        <Container fluid>
          <Navbar.Brand href="/">Task Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/" active>Home</Nav.Link>
                <Nav.Link href="/create-task">Create Task</Nav.Link>
                <Nav.Link href="/edit-category">Edit Categorys</Nav.Link>
                <Nav.Link href="/edit-tag">Edit Tags</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-category" element={<EditCategory />} />
          <Route path="/edit-tag" element={<EditTag />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
