import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import DashHeader from "../features/dash/DashHeader";
const Layout = () => {
  return (
    <>
      <AppHeader />
      <DashHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};
export default Layout;
