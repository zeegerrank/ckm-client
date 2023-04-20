/**import useAuth from "../../hooks/useAuth";*/ import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const DashButtons = (props) => {
  const { name } = props;

  // const { isAdmin, isManager, isEmployee } = useAuth();

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

  const buttonStyle = {
    fontSize: "32px",
    textDecoration: "none",
    color: "inherit",
  };

  const Buttons = {
    Users: {
      getAll: () => (
        <FontAwesomeIcon
          icon={icon({
            name: "users",
            style: "solid",
          })}
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
    },
    Stocks: {
      getAll: () => (
        <FontAwesomeIcon
          icon={icon({
            name: "box-open",
            style: "solid",
          })}
          style={buttonStyle}
        />
      ),
      create: () => (
        <FontAwesomeIcon
          icon={icon({
            name: "circle-plus",
            style: "solid",
          })}
          style={buttonStyle}
        />
      ),
      edit: () => (
        <FontAwesomeIcon
          icon={icon({
            name: "arrows-rotate",
            style: "solid",
          })}
          style={buttonStyle}
        />
      ),
    },
  };
  let content;

  switch (name) {
    /**User Dash's Buttons */
    case "getUsers":
      content = Buttons.Users.getAll();
      break;
    case "createUser":
      content = Buttons.Users.create();
      break;
    case "editUsers":
      content = Buttons.Users.edit();
      break;

    /**Stock Dash's Buttons */
    case "getStocks":
      content = Buttons.Stocks.getAll();
      break;
    case "createStock":
      content = Buttons.Stocks.create();
      break;
    case "editStocks":
      content = Buttons.Stocks.edit();
      break;

    default:
  }

  return content;
};

export default DashButtons;
