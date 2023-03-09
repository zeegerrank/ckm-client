import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";const AppHeader = () => {
  return (
    <Navbar expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">CookiesMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="app-navbar" />
        <Navbar.Collapse className="justify-content-end" id="app-navbar">
          <Nav>
            {/**public route */}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#product">Products</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
            {/**private route */}
            <NavDropdown href="#manage" title="Manage">
              <NavDropdown.Item href="#manage/product">
                Product
              </NavDropdown.Item>
              <NavDropdown.Item href="#manage/stocks">Stocks</NavDropdown.Item>
              <NavDropdown.Item href="#manage/users">Users</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text className="mx-auto mx-md-5">
              Signed in as: <a href="#profile">Test Name</a>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default AppHeader;
