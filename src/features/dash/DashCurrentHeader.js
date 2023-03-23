import { useLocation } from "react-router-dom";
const DashCurrentHeader = () => {
  const location = useLocation();
  const path = location.pathname;

  let currentHeader;

  let section = path.split("/")[2];

  let action = path.split("/")[3];

  const setHeader = (section, action) => {
    const capSection = section.charAt(0).toUpperCase() + section.slice(1);

    let capAction;
    if (action) {
      capAction = action.charAt(0).toUpperCase() + action.slice(1);
    } else {
      capAction = "Dashboard";
    }

    const headerText = `${capSection} ${capAction}`;

    currentHeader = <h3 className="mt-3 text-center">{headerText}</h3>;

    return currentHeader;
  };

  setHeader(section, action);

  return currentHeader;
};
export default DashCurrentHeader;
