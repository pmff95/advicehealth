import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BaseLayout from "./base/BaseLayout";
import { clearStoredToken, getStoredToken } from "./utils/auth";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(getStoredToken()));

  useEffect(() => {
    setLoggedIn(Boolean(getStoredToken()));
  }, []);

  const handleLogout = () => {
    clearStoredToken();
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <BaseLayout onLogout={handleLogout}>
      <Dashboard />
    </BaseLayout>
  );
}
