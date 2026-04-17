import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import SiteManagement from './pages/Sites/List';
import RedirectManagement from './pages/Redirects/List';
import CategoryManagement from './pages/Categories/List';
import UserManagement from './pages/Users/UserList';
import LogManagement from './pages/Logs/List';
import MediaManagement from './pages/Media/List';
import PageEditor from './pages/Media/Editor';
import './App.css';

// Create a theme context so anyone can toggle it
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Optional: read from local storage
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', nextDark ? 'dark' : 'light');
  };

  const dashboardTheme = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#8b5cf6',
      borderRadius: 10,
    },
    components: {
      Card: {
        boxShadowTertiary: '0 4px 20px -5px rgba(0,0,0,0.05)',
      },
      Button: {
        borderRadius: 8,
        fontWeight: 600,
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider theme={dashboardTheme}>
        <div style={{ background: isDarkMode ? '#141414' : '#fff', minHeight: '100vh' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="sistem/siteler" element={<SiteManagement />} />
                <Route path="sistem/yonlendirme" element={<RedirectManagement />} />
                <Route path="sistem/kullanicilar" element={<UserManagement />} />
                <Route path="sistem/loglar" element={<LogManagement />} />
                <Route path="dosya/medya" element={<MediaManagement />} />
                <Route path="dosya/editor" element={<PageEditor />} />
                <Route path="kategoriler" element={<CategoryManagement />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default App;
