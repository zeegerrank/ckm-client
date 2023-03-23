import { useEffect, useState, useRef } from "react";import useTitle from "../../hooks/useTitle";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { PulseLoader } from "react-spinners";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

const Login = () => {
  useTitle("Login");

  const dispatch = useDispatch();

  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const userRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err?.status === 401) {
        setErrMsg("Invalid email or password");
      } else if (err?.status === 500) {
        setErrMsg("Server error");
      } else if (err?.status === 400) {
        setErrMsg("Invalid email or password");
      } else {
        setErrMsg(err?.data?.message);
      }
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (isLoading) return <PulseLoader />;
  if (isError) return setErrMsg(error.message);
  if (isSuccess) {
    const persist = localStorage.getItem("persist");
    if (!persist) {
      localStorage.setItem("persist", true);
    }
    console.log("login success");
    window.location.href = "/";
  }

  const content = (
    <div className="login">
      <Container>
        <Card className="my-4 mx-md-5">
          <Card.Body>
            <Card.Title className="mb-2">Login</Card.Title>
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  ref={userRef}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              <Button
                className="mt-3"
                variant="primary"
                type="submit"
                onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            <Card.Text className="mt-2">
              Don't have an account? <a href="/register">Register</a>
            </Card.Text>
          </Card.Body>
        </Card>
        {errMsg && (
          <Alert variant="danger" tabIndex="-1">
            {errMsg}
          </Alert>
        )}
      </Container>
    </div>
  );
  return content;
};

export default Login;
