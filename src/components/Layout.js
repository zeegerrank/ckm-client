import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import DashHeader from "../features/dash/DashHeader";
import { Stack } from "react-bootstrap";
const Layout = () => {
  return (
    <Stack direction="vertical">
      <AppHeader />
      <DashHeader />
      <Outlet />
      <AppFooter />
    </Stack>
  );
};
export default Layout;
