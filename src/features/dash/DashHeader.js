import { useLocation } from "react-router-dom";import DashCurrentHeader from "./DashCurrentHeader";
import { Container } from "react-bootstrap";
import DashNavs from "./DashNavs";
import useAuth from "../../hooks/useAuth";

const DashHeader = () => {
  const { isAdmin, isManager, isEmployee } = useAuth();
  const path = useLocation().pathname;

  let content;

  content = (
    <Container>
      {path.includes("/manage") && <DashCurrentHeader />}
      <DashNavs />
    </Container>
  );

  return content;
};
export default DashHeader;
