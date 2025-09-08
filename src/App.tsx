import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BaseLayout from "./base/BaseLayout";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <BaseLayout>
      <Dashboard />
    </BaseLayout>
  );
}
