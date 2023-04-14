import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const DashButtons = (props) => {
  const { name } = props;

  const { isAdmin, isManager, isEmployee } = useAuth();

  /**
   * admin access
   * - manage users
   * - manage products
   * - manage stocks
   * - manage instructions
   *
   * manager access
   * - get all users
   * - get all products
   * - edit products
   * - get all stocks
   * - edit stocks
   * - get all instructions
   *
   * employee access
   * - get all products
   * - get all stocks
   * - get all instructions
   */

  const buttonTagStyle = {
    textDecoration: "none",
    color: "inherit",
  };
  const buttonStyle = { fontSize: "28px" };

  const UsersButtons = {
    getAll: () => (
      <FontAwesomeIcon
        icon={icon({ name: "users", style: "solid" })}
        style={buttonStyle}
      />
    ),
    create: () => (
      <FontAwesomeIcon
        icon={icon({
          name: "user-plus",
          style: "solid",
        })}
        style={buttonStyle}
      />
    ),
    edit: () => (
      <FontAwesomeIcon
        icon={icon({
          name: "user-pen",
          style: "solid",
        })}
        style={buttonStyle}
      />
    ),
  };
  let content;

  switch (name) {
    case "createUser":
      content = UsersButtons.create();
      break;
    case "editUsers":
      content = UsersButtons.edit();
      break;
    case "getUsers":
      content = UsersButtons.getAll();
      break;
    default:
  }

  return content;
};

export default DashButtons;
