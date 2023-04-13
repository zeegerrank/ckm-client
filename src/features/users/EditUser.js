import { memo, useState } from "react";import { useGetUsersQuery, useUpdateUserMutation } from "./usersApiSlice";
import { ROLES } from "../../config/ROLES";
import { Button, Form, ToggleButton, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
const EditUser = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data.entities[userId],
    }),
  });

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [usernameEditToggle, setUsernameEditToggle] = useState(false);
  const [emailEditToggle, setEmailEditToggle] = useState(false);
  const [roleEditToggle, setRoleEditToggle] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onRoleChanged = (e) => setRole(e.target.value);

  const onToggleUsernameEdit = () => setUsernameEditToggle(!usernameEditToggle);
  const onToggleEmailEdit = () => setEmailEditToggle(!emailEditToggle);
  const onToggleRoleEdit = () => setRoleEditToggle(!roleEditToggle);

  const USERNAME_REGEX = /^[a-zA-Z0-9]{3,}$/;
  const onSaveUsername = async (e) => {
    e.preventDefault();
    if (USERNAME_REGEX.test(username)) {
      try {
        await updateUser({ id: user.id, username });
        setUsernameEditToggle(false);
      } catch (err) {
        error.data.message = "Something went wrong: " + err.message;
      }
    } else {
      error.data.message = "Username must be at least 3 characters long";
    }
  };
  const onCancelUsername = () => {
    setUsername("");
  };
  const usernameCellContent = (
    <td className="d-flex">
      <ToggleButton
        className={!usernameEditToggle ? "ms-2 me-3" : "ms-2 me-3 pt-3"}
        type="checkbox"
        variant="outline-primary"
        value={usernameEditToggle}
        onClick={onToggleUsernameEdit}
        checked={usernameEditToggle}>
        {usernameEditToggle ? (
          <>
            <i class="fa-solid fa-rotate-left"></i> Undo
          </>
        ) : (
          <>
            <i class="fa-regular fa-pen-to-square"></i> Edit
          </>
        )}
      </ToggleButton>
      {usernameEditToggle ? (
        <span>
          <Form onSubmit={onSaveUsername} className="d-inline">
            <Form.Control
              type="text"
              value={username}
              onChange={onUsernameChanged}
              placeholder={user.username}></Form.Control>
            <Button size="sm" variant="success" className="mx-1 mt-1">
              <i
                onClick={onSaveUsername}
                class="fa-sharp fa-solid fa-check"></i>
            </Button>
            <Button size="sm" variant="danger" className="mx-1 mt-1">
              <i
                onClick={onCancelUsername}
                class="fa-sharp fa-solid fa-xmark"></i>
            </Button>
          </Form>
        </span>
      ) : (
        user.username
      )}
    </td>
  );

  const EMAIL_REGEX = /^[a-zA-Z0-9]{3,}$/;
  const onSaveEmail = async (e) => {
    e.preventDefault();
    if (EMAIL_REGEX.test(email)) {
      try {
        await updateUser({ id: user.id, email });
        setEmailEditToggle(false);
      } catch (err) {
        error.data.message = "Something went wrong: " + err.message;
      }
    } else {
      error.data.message = "Email must be at least 3 characters long";
    }
  };
  const onCancelEmail = () => {
    setEmail("");
  };
  const emailCellContent = (
    <td className="d-flex">
      <ToggleButton
        className={!emailEditToggle ? "ms-2 me-3" : "ms-2 me-3 pt-3"}
        type="checkbox"
        variant="outline-primary"
        value={emailEditToggle}
        onClick={onToggleEmailEdit}
        checked={emailEditToggle}>
        {emailEditToggle ? (
          <>
            <i class="fa-solid fa-rotate-left"></i> Undo
          </>
        ) : (
          <>
            <i class="fa-regular fa-pen-to-square"></i> Edit
          </>
        )}
      </ToggleButton>
      {emailEditToggle ? (
        <span>
          <Form onSubmit={onSaveEmail} className="d-inline">
            <Form.Control
              type="text"
              value={email}
              onChange={onEmailChanged}
              placeholder={user.email}></Form.Control>
            <Button size="sm" variant="success" className="mx-1 mt-1">
              <i onClick={onSaveEmail} class="fa-sharp fa-solid fa-check"></i>
            </Button>
            <Button size="sm" variant="danger" className="mx-1 mt-1">
              <i onClick={onCancelEmail} class="fa-sharp fa-solid fa-xmark"></i>
            </Button>
          </Form>
        </span>
      ) : (
        user.email
      )}
    </td>
  );

  const roleOptions = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </option>
  ));

  const onSaveRole = async (e) => {
    e.preventDefault();
    if (role.length >= 3) {
      try {
        await updateUser({ id: user.id, role });
        setRoleEditToggle(false);
      } catch (err) {
        error.data.message = "Something went wrong: " + err.message;
      }
    } else {
      error.data.message = "Role must be at least 3 characters long";
    }
  };
  const onCancelRole = () => {
    setRole("");
  };
  const rolesColor = (role) => {
    switch (role[0]) {
      case "admin":
        return "primary";
      case "manager":
        return "danger";
      case "employee":
        return "success";
      case "customer":
        return "secondary";
      default:
        return "secondary";
    }
  };
  const roleCellContent = (
    <td className="d-flex">
      <ToggleButton
        className={!roleEditToggle ? "ms-2 me-3" : "ms-2 me-3 pt-3"}
        type="checkbox"
        variant="outline-primary"
        value={roleEditToggle}
        onClick={onToggleRoleEdit}
        checked={roleEditToggle}>
        {roleEditToggle ? (
          <>
            <i class="fa-solid fa-rotate-left"></i> Undo
          </>
        ) : (
          <>
            <i class="fa-regular fa-pen-to-square"></i> Edit
          </>
        )}
      </ToggleButton>
      {roleEditToggle ? (
        <span>
          <Form onSubmit={onSaveRole} className="d-inline">
            <Form.Select
              type="text"
              value={role}
              onChange={onRoleChanged}
              placeholder={user.roles}>
              <option value="">Origin: {user.roles}</option>
              {roleOptions}
            </Form.Select>
            <Button
              disable={role}
              size="sm"
              variant="success"
              className="mx-1 mt-1">
              <i onClick={onSaveRole} class="fa-sharp fa-solid fa-check"></i>
            </Button>
            <Button size="sm" variant="danger" className="mx-1 mt-1">
              <i onClick={onCancelRole} class="fa-sharp fa-solid fa-xmark"></i>
            </Button>
          </Form>
        </span>
      ) : (
        <Badge
          className=" d-inline-block h-25 mt-2"
          bg={rolesColor(user.roles)}>
          {user.roles}
        </Badge>
      )}
    </td>
  );

  let content;
  if (user) {
    return (content = (
      <tr>
        <td>{usernameCellContent}</td>
        <td>{emailCellContent}</td>
        <td>{roleCellContent}</td>
        <td>{user.createdAt?.replaceAll("T", " T")}</td>
      </tr>
    ));
  }

  return content;
};

const memoizedUser = memo(EditUser);

export default memoizedUser;
