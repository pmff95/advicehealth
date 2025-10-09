import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BaseLayout from "./base/BaseLayout";
import { clearStoredToken, getStoredToken } from "./utils/auth";
import { fetchCurrentUser } from "./utils/api";
import type { UserProfile } from "./types/user";
import Signup from "./pages/Signup";

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSignupVisible, setIsSignupVisible] = useState(false);

  useEffect(() => {
    const token = getStoredToken();

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    fetchCurrentUser(token)
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch(() => {
        clearStoredToken();
        setUser(null);
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, []);

  const handleLogin = (currentUser: UserProfile) => {
    setUser(currentUser);
  };

  const handleLogout = () => {
    clearStoredToken();
    setUser(null);
  };

  if (isCheckingAuth) {
    return null;
  }

  if (!user) {
    if (isSignupVisible) {
      return <Signup onBackToLogin={() => setIsSignupVisible(false)} />;
    }

    return (
      <Login
        onLogin={handleLogin}
        onNavigateToSignup={() => setIsSignupVisible(true)}
      />
    );
  }

  return (
    <BaseLayout user={user} onLogout={handleLogout}>
      <Dashboard />
    </BaseLayout>
  );
}
