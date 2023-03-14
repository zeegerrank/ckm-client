import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isManager = false;
  let isEmployee = false;
  let isCustomer = false;
  let status = "guest";

  if (token) {
    const decodedToken = jwtDecode(token);
    const { username, roles } = decodedToken.UserInfo;

    isAdmin = roles.includes("Admin");
    isManager = roles.includes("Manager");
    isEmployee = roles.includes("Employee");
    isCustomer = roles.includes("Customer");

    if (isEmployee) {
      status = "employee";
    }
    if (isManager) {
      status = "manager";
    }
    if (isAdmin) {
      status = "admin";
    }
    if (isCustomer) {
      status = "customer";
    }

    return { username, status, isAdmin, isManager, isEmployee, isCustomer };
  }

  return {
    username: "",
    status: "guest",
    isAdmin: false,
    isManager: false,
    isEmployee: false,
  };
};

export default useAuth;
