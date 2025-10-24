/* eslint-disable no-debugger */
import { useState } from "react";
import "./Login.css";
import VerifyBeneficiary from "./VerifyBeneficiary";
import Signup from "./Signup";
import { sendPasswordResetEmail } from "../utils/api";
import type { UserProfile } from "../types/user";
import FormForgotPassword from "../components/Form/FormForgotPassword";
import FormLogin from "../components/Form/FormLogin";

interface LoginProps {
  onLogin: (user: UserProfile) => void;
  onNavigateToSignup?: () => void; // ✅ adicione esta linha
}

type AuthScreen = "login" | "verifyBeneficiary" | "signup";

export default function Login({ onLogin }: LoginProps) {
  const [activeScreen, setActiveScreen] = useState<AuthScreen>("login");
  const [beneficiaryData, setBeneficiaryData] = useState<{
    guideNumber?: string;
    cpf: string;
    birthDate: string;
    fullName: string;
    email?: string;
  } | null>(null);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleBeneficiaryFound = (data: {
    cpf: string;
    guideNumber: string;
    birthDate: string;
    fullName: string;
    email?: string;
  }) => {
    setBeneficiaryData(data);
    setActiveScreen("signup");
  };

  const handleBackToLogin = () => {
    setActiveScreen("login");
  };

  return (
    <>
      {/* LOGIN + FORGOT PASSWORD */}
      {activeScreen === "login" && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="login-left">
            <div className="login-page">
              <div className="portal-header">
                <h1>Portal do Beneficiário</h1>
              </div>

              <div className="login-card">
                {!showForgotPassword ? (
                  <FormLogin
                    onLogin={onLogin}
                    onShowForgotPassword={() => setShowForgotPassword(true)} // ✅
                    onNavigateToSignup={() =>
                      setActiveScreen("verifyBeneficiary")
                    }
                  />
                ) : (
                  <FormForgotPassword
                    onBackToLogin={() => setShowForgotPassword(false)} // ✅
                    onSendEmail={sendPasswordResetEmail} // ✅ mesma função usada antes
                  />
                )}
              </div>
            </div>
          </div>

          <div className="login-right">
            <img src="/images/login-background.jpg" alt="Login" />
          </div>
        </div>
      )}

      {/* VERIFY BENEFICIARY */}
      {activeScreen === "verifyBeneficiary" && (
        <VerifyBeneficiary
          onBeneficiaryFound={handleBeneficiaryFound}
          onBack={handleBackToLogin}
        />
      )}

      {/* SIGNUP */}
      {activeScreen === "signup" && beneficiaryData && (
        <Signup
          onBackToLogin={handleBackToLogin}
          beneficiaryData={beneficiaryData}
        />
      )}
    </>
  );
}
