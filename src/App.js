import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import NewUserForm from "./features/users/NewUserForm";
import Login from "./features/auth/Login";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/**public route */}
        <Route index element={<Landing />} />
        <Route path="products" element="#products" />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<NewUserForm />} />
        {/**private route */}
      </Route>
    </Routes>
  );
}

export default App;
