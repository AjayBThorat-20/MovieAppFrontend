// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Login, Register } from './components/auth';
import { AdminPage, UserPage } from './components/pages';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UnauthorizedPage from './components/errors/UnauthorizedPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <div>
                {/* <h1>401 - Unauthorized</h1>
                <p>You are not authorized to access this page.</p> */}
                <UnauthorizedPage/>
              </div>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;












