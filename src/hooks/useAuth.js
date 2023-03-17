import { useSelector } from "react-redux";import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import { ROLES } from "../config/ROLES";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;
  let isManager = false;
  let isEmployee = false;
  let isCustomer = false;
  let status = "guest";

  if (token) {
    const decodedToken = jwtDecode(token);
    const { username, roles } = decodedToken.userInfo;

    isAdmin = roles.includes(ROLES.ADMIN);
    isManager = roles.includes(ROLES.MANAGER);
    isEmployee = roles.includes(ROLES.EMPLOYEE);
    isCustomer = roles.includes(ROLES.CUSTOMER);

    if (isCustomer) status = "customer";
    if (isEmployee) status = "employee";
    if (isManager) status = "manager";
    if (isAdmin) status = "admin";

    return {
      username,
      roles,
      status,
      isAdmin,
      isManager,
      isEmployee,
      isCustomer,
    };
  }

  return {
    username: "",
    roles: [],
    status,
    isAdmin,
    isManager,
    isEmployee,
    isCustomer,
  };
};

export default useAuth;
