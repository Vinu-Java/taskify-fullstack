import { ToastContainer } from "react-toastify";
import "./App.css";
import TodoPage from "./pages/TodoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ProtectedRoute from "./services/protectedRoute";
import Login from "./pages/Login";
import AddTodo from "./pages/AddTodo";
import MainLayout from "./layout/MainLayout";

function App() {

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        pauseOnHover
        closeOnClick
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/todos" element={<TodoPage />} />
            <Route path="/add-todo" element={<AddTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
