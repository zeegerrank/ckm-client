import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import NewUserForm from "./features/users/NewUserForm";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/**public route */}
        <Route index element={<Landing />} />
        <Route path="products" element="#products" />
        <Route path="login" element="#login" />
        <Route path="register" element={<NewUserForm />} />
        {/**private route */}
      </Route>
    </Routes>
  );
}

export default App;
