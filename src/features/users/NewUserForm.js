import { useState, useEffect } from "react";import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";

const USERNAME_REGEX = /^[a-zA-Z0-9]{4,20}$/;
/**username must contain with 4-20 characters includes alphabets and numbers  */
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{4,20})/;
/**password must contain with 4-20 characters includes capital alphabets ,numbers and these special symbol"!@#$%^&*" */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/;
/**email is invalid */

const NewUserForm = () => {
  useTitle("Cookies Me: Register New User");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameOnFocus, setUsernameOnFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailOnFocus, setEmailOnFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordOnFocus, setPasswordOnFocus] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordOnFocus, setConfirmPasswordOnFocus] = useState(false);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidConfirmPassword(password === confirmPassword);
  }, [confirmPassword, password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    setPassword("");
    setConfirmPassword("");
  }, [isError]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);

  const canSubmit =
    [validUsername, validEmail, validPassword, validConfirmPassword].every(
      Boolean
    ) && !isLoading;

  const onSubmitClicked = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        await addNewUser({ email, username, password });
      } catch (err) {
        error.data.message = "Something went wrong: " + err.message;
      }
    }
  };

  /** const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : '' */

  const content = (
    <Container>
      {!canSubmit ? (
        <Alert
          key="warning"
          variant="warning"
          className="text-muted mt-2 mx-md-5">
          Please fill all the required fields
        </Alert>
      ) : null}
      <Card className="my-3 mx-md-5 shadow-sm">
        <Card.Body className="px-md-3">
          <Card.Title className="mb-3">Register</Card.Title>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                placeholder="Enter username"
                value={username}
                onChange={onUsernameChanged}
                onFocus={() => setUsernameOnFocus(true)}
                onBlur={() => setUsernameOnFocus(false)}
              />
              {(!validUsername && usernameOnFocus) ||
              (username && !validUsername) ? (
                <Form.Text className="text-muted">
                  Username must contain with 4-20 characters includes alphabets
                  and numbers
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={onEmailChanged}
                onFocus={() => setEmailOnFocus(true)}
                onBlur={() => setEmailOnFocus(false)}
              />
              {(!validEmail && emailOnFocus) || (email && !validEmail) ? (
                <Form.Text className="text-muted">
                  Must be valid email address
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={onPasswordChanged}
                onFocus={() => setPasswordOnFocus(true)}
                onBlur={() => setPasswordOnFocus(false)}
              />
              {(!validPassword && passwordOnFocus) ||
              (password && !validPassword) ? (
                <Form.Text className="text-muted">
                  Password must contain with 4-20 characters includes capital
                  alphabets ,numbers and these special symbol"!@#$%^&*"
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                autoCapitalize="off"
                value={confirmPassword}
                onChange={onConfirmPasswordChanged}
                onFocus={() => setConfirmPasswordOnFocus(true)}
                onBlur={() => setConfirmPasswordOnFocus(false)}
              />
              {!validConfirmPassword || confirmPasswordOnFocus ? (
                <Form.Text className="text-muted">
                  Password must match with above password
                </Form.Text>
              ) : null}
            </Form.Group>

            <Button
              className="mt-3"
              onClick={onSubmitClicked}
              disabled={!canSubmit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {error && isError ? (
        <Alert key="danger" variant="danger" className="mt-2 mx-md-5">
          {error?.data?.message}
        </Alert>
      ) : null}
    </Container>
  );

  return content;
};

export default NewUserForm;
