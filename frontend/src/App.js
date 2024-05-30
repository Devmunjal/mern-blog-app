import logo from "./logo.svg";
import "./App.css";
import Register from "./screens/auth/Register";
import BlogList from "./screens/blogs/BlogList";
import Headers from "./components/Headers";
import BlogDetail from "./screens/blogs/BlogDetail";
import CreateBlog from "./screens/blogs/CreateBlog";
import Login from "./screens/auth/Login";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { updateToken, updateUser } from "./store/action";
import ProtectedRoute from "./utils/ProtectedRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    let userData = localStorage.getItem("userData");
    if (jwt && userData) {
      dispatch(updateToken(jwt));
      dispatch(updateUser(JSON.parse(userData)));
    }
    return () => {};
  }, []);

  return (
    <div className="App">
      <Router>
        <Headers />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route
            path="/blog/add"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog/:slug/edit"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
