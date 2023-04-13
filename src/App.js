import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/ROLES";
import Welcome from "./features/auth/Welcome";
import PrivateOutlet from "./features/auth/PrivateOutlet";
import PersistLogin from "./features/auth/PersistLogin";
import useAuth from "./hooks/useAuth";
import Register from "./features/auth/Register";
import UsersList from "./features/users/UsersList";
import NewUserForm from "./features/users/NewUserForm";
import EditUsersForm from "./features/users/EditUsersForm";
import Prefetch from "./app/api/Prefetch";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const { username } = useAuth();
  const user = username ? true : false;

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Prefetch />}>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<PageNotFound />} />
            {/**public route */}
            <Route index element={<Landing />} />
            <Route path="products" element="#products" />
            <Route
              path="login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route path="register" element={<Register />} />

            {/**private route */}
            <Route
              element={
                <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
              }>
              <Route path="account" element={<PrivateOutlet />}>
                <Route index element={<Welcome />} />
              </Route>
              <Route path="manage">
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path="add" element={<NewUserForm />} />
                  <Route path="edit" element={<EditUsersForm />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
