import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const AppHeader = () => {
  const { username, roles } = useAuth();
  let user;
  if (!username || !roles || roles.length === 0) {
    user = false;
  } else {
    user = true;
  }

  return (
    <Navbar expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">CookiesMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="app-navbar" />
        <Navbar.Collapse className="justify-content-end" id="app-navbar">
          <Nav className="text-center">
            {/**public route */}
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#product">Products</Nav.Link>
            {user ? null : (
              <>
                <Nav.Link className="mx-auto mx-md-5" href="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="mx-auto mx-md-5" href="/register">
                  Register
                </Nav.Link>
              </>
            )}
            {/**private route */}

            {user ? (
              <>
                <NavDropdown className="" href="#manage" title="Manage">
                  <NavDropdown.Item href="#manage/product">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#manage/stocks">
                    Stocks
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#manage/users">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#manage/instructions">
                    Instructions
                  </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Text className="mx-auto mx-md-5">
                  Signed in as: <a href="/account">{username}</a>
                </Navbar.Text>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default AppHeader;
