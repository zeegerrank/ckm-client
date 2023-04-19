import { useState } from "react";import { useLocation } from "react-router-dom";
import DashButtons from "./DashButtons";
import useAuth from "../../hooks/useAuth";
import { Button } from "react-bootstrap";

const DashNavs = () => {
  const { isAdmin, isManager, isEmployee } = useAuth();
  const path = useLocation().pathname;

  const section = path.split("/")[2];
  const action = path.split("/")[3];

  const buttonStyle = "mx-3 my-3";

  let content;

  if (section === "users") {
    let atUsers;
    let atCreateUser;
    let atEditUsers;

    if (!action) atUsers = true;
    if (action === "add") atCreateUser = true;
    if (action === "edit") atEditUsers = true;

    content = (
      <>
        <Button
          href="/manage/users"
          className={buttonStyle}
          variant={atUsers ? "primary" : "outline-primary"}>
          <DashButtons name="getUsers" />
          <div>Users List</div>
        </Button>
        <Button
          href="/manage/users/add"
          className={buttonStyle}
          variant={atCreateUser ? "success" : "outline-success"}>
          <DashButtons name="createUser" />
          <div>Add User</div>
        </Button>
        <Button
          href="/manage/users/edit"
          className={buttonStyle}
          variant={atEditUsers ? "danger" : "outline-danger"}>
          <DashButtons name="editUsers" />
          <div>Edit Users</div>
        </Button>
      </>
    );
  } else if (section === "stocks") {
    let atStocks;
    let atCreateStock;
    let atEditStocks;

    if (!action) atStocks = true;
    if (action === "add") atCreateStock = true;
    if (action === "edit") atEditStocks = true;

    content = (
      <>
        <Button
          href="/manage/stocks"
          className={buttonStyle}
          variant={atStocks ? "primary" : "outline-primary"}>
          <DashButtons name="getStocks" />
          <div>Stocks List</div>
        </Button>
        <Button
          href="/manage/stocks/add"
          className={buttonStyle}
          variant={atStocks ? "success" : "outline-success"}>
          <DashButtons name="createStock" />
          <div>Add New</div>
        </Button>
        <Button
          href="/manage/stocks/edit"
          className={buttonStyle}
          variant={atStocks ? "danger" : "outline-danger"}>
          <DashButtons name="editStocks" />
          <div>Update Stocks</div>
        </Button>
      </>
    );
  }

  return <div className="text-center">{content}</div>;
};

export default DashNavs;
