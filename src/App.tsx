import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./hooks/useAuth";
import theme from "./theme";
import PageTemplate from "./components/PageTemplate";
import ProtectedRoute from "./components/ProtectedRoute";
import FullScreenIframe from "./pages/Preview";
import useSiteDataStore from "./store/useSiteDataStore";

function App() {
  const { formData } = useSiteDataStore();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <PageTemplate>
                  <Login />
                </PageTemplate>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PageTemplate>
                    <Dashboard />
                  </PageTemplate>
                </ProtectedRoute>
              }
            />
            <Route
              path="/preview"
              element={
                <ProtectedRoute>
                  <FullScreenIframe />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
