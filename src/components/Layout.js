import { Outlet } from "react-router-dom";import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
const Layout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};
export default Layout;
