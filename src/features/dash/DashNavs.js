import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashButtons from "./DashButtons";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap";

const DashNavs = () => {
  const { isAdmin, isManager, isEmployee } = useAuth();
  const path = useLocation().pathname;

  const section = path.split("/")[2];
  const action = path.split("/")[3];

  let content;

  let atUsers;
  let atCreateUser;
  let atEditUsers;

  if (section === "users") atUsers = true;
  if (section === "users" && action === "add") atCreateUser = true;
  if (section === "users" && action === "edit") atEditUsers = true;

  if (section === "users") {
    content = (
      <>
        <Button
          href="/manage/users"
          className="me-2 mt-3"
          variant={atUsers ? "primary" : "outline-primary"}>
          <DashButtons name="getUsers" />
          <div>Users List</div>
        </Button>
        <Button
          href="/manage/users/add"
          className="mx-2 mt-3"
          variant={atCreateUser ? "success" : "outline-success"}>
          <DashButtons name="createUser" />
          <div>Add User</div>
        </Button>
        <Button
          href="/manage/users/edit"
          className="mx-2 mt-3"
          variant={atEditUsers ? "danger" : "outline-danger"}>
          <DashButtons name="editUsers" />
          <div>Edit Users</div>
        </Button>
      </>
    );
  }

  return <div className="text-center">{content}</div>;
};

export default DashNavs;
