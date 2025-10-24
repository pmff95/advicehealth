import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BaseLayout from "./base/BaseLayout";
import Signup from "./pages/Signup";
import CompleteRegistration from "./pages/CompleteRegistration";

import { clearStoredToken, getStoredToken } from "./utils/auth";
import { fetchCurrentUser } from "./utils/api";
import type { UserProfile } from "./types/user";
import ResetPassword from "./pages/ResetPassword";

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
      .then((currentUser) => setUser(currentUser))
      .catch(() => {
        clearStoredToken();
        setUser(null);
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  const handleLogin = (currentUser: UserProfile) => setUser(currentUser);

  const handleLogout = () => {
    clearStoredToken();
    setUser(null);
  };

  if (isCheckingAuth) return null;

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota isolada para pré-cadastro usando React Router */}
        <Route path="/pre-registration" element={<CompleteRegistration />} />

        {/* Rota isolada para recuperação de senha usando React Router */}
        <Route path="/confirm-password-reset" element={<ResetPassword />} />        

        {/* Rota coringa que mantém o fluxo atual baseado em estado */}
        <Route
          path="*"
          element={
            !user ? (
              isSignupVisible ? (
                <Signup onBackToLogin={() => setIsSignupVisible(false)} />
              ) : (
                <Login
                  onLogin={handleLogin}
                  onNavigateToSignup={() => setIsSignupVisible(true)}
                />
              )
            ) : (
              <BaseLayout user={user} onLogout={handleLogout}>
                <Dashboard />
              </BaseLayout>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
