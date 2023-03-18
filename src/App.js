import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import NewUserForm from "./features/users/NewUserForm";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/ROLES";
import Welcome from "./features/auth/Welcome";
import PrivateOutlet from "./features/auth/PrivateOutlet";
import PersistLogin from "./features/auth/PersistLogin";
import useAuth from "./hooks/useAuth";

function App() {
  const { username } = useAuth();
  const user = username ? true : false;

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          {/**public route */}
          <Route index element={<Landing />} />
          <Route path="products" element="#products" />
          <Route
            path="login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="register" element={<NewUserForm />} />
          {/**private route */}
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route path="/account" element={<PrivateOutlet />}>
              <Route index element={<Welcome />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
