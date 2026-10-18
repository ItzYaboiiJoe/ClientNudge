// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";

import { BrowserRouter, Routes, Route } from "react-router";
import NotFoundPage from "./components/NotFoundPage";
import { Toaster } from "./components/ui/toast";
import ProtectedLayout from "./components/ProtectedLayout";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Error Page */}
        <Route path="*" element={<NotFoundPage />} />
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomersPage />} />
          </Route>
        </Route>
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
