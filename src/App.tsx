import "./index.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Employees from "./pages/Employee";
import EmployeeForm from "./pages/EmployeeForm";
import Attendance from "./pages/Attendance";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/employees"
              element={
                <Layout>
                  <Employees />
                </Layout>
              }
            />
            <Route
              path="/employees/add"
              element={
                <Layout>
                  <EmployeeForm />
                </Layout>
              }
            />
            <Route
              path="/employees/edit/:id"
              element={
                <Layout>
                  <EmployeeForm />
                </Layout>
              }
            />
            <Route
              path="/attendance"
              element={
                <Layout>
                  <Attendance />
                </Layout>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#ffffff",
            border: "1px solid #3f3f46",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#ffffff", secondary: "#000000" },
          },
          error: {
            iconTheme: { primary: "#ffffff", secondary: "#000000" },
          },
          duration: 3500,
        }}
      />
    </>
  );
}

export default App;
