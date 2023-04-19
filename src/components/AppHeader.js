import { useEffect, useState } from "react";import { Container, Nav, Navbar, NavDropdown, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import PulsLoader from "react-spinners/PulseLoader";

const AppHeader = () => {
  const navigate = useNavigate();

  const { username } = useAuth();
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (!username) {
      setUser(false);
    } else {
      setUser(true);
    }
  }, [navigate, username]);

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      await sendLogout().unwrap();
      setUser(false);
      localStorage.removeItem("persist");
    } catch (err) {
      console.log(err);
    }
  };

  if (isSuccess) {
    console.log("logout success");
  }

  return (
    <>
      <Navbar expand="md" bg="dark" variant="dark" className="mb-3">
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
                </>
              )}
              {/**private route */}

              {user ? (
                <>
                  <NavDropdown className="" href="#manage" title="Manage">
                    <NavDropdown.Item href="#product">
                      Products
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/manage/stocks">
                      Stocks
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/manage/users">
                      Users
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#instructions">
                      Instructions
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Navbar.Text className="mx-2 mx-md-5">
                    Signed in as: <a href="/account">{username}</a>
                  </Navbar.Text>
                  <Navbar.Text onClick={onLogout}>
                    <a href="#logout" style={{ textDecoration: "none" }}>
                      <p className=" d-md-none">Logout</p>
                      <i
                        title="Logout"
                        style={{ color: "white" }}
                        className="fa-solid fa-xl fa-right-from-bracket d-none d-md-inline"></i>
                    </a>
                  </Navbar.Text>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isError ? <Alert>{error?.data?.message}</Alert> : null}
      {isLoading ? PulsLoader : null}
    </>
  );
};
export default AppHeader;
