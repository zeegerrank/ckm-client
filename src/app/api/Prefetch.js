import { useEffect } from "react";import { store } from "../store";
import { usersApiSlice } from "../../features/users/usersApiSlice";
import { Outlet } from "react-router-dom";
const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
  }, []);
  return <Outlet />;
};
export default Prefetch;
