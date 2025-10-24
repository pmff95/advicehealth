import Header from "../components/Header/Header";
import "./BaseLayout.css";
import { useMemo, useState, type ReactNode } from "react";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import BeneficiaryCard from "../components/BeneficiaryCard/BeneficiaryCard";
import type { UserProfile } from "../types/user";
import { fetchCurrentUser } from "../utils/api";
import { getStoredToken } from "../utils/auth";

interface BaseLayoutProps {
  children: ReactNode;
  onLogout: () => void;
  user: UserProfile;
}

export default function BaseLayout({
  children,
  onLogout,
  user,
}: BaseLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"dashboard" | "profile">(
    "dashboard"
  );

  // ✅ Estado local do usuário — agora usado ativamente
  const [userData, setUserData] = useState<UserProfile>(user);

  // ✅ Atualiza quando o `user` vindo do App mudar (ex: login/logout)
  // evita warning de variável não usada
  useMemo(() => {
    setUserData(user);
  }, [user]);

  // ✅ Função para atualizar os dados via API
  const refreshUser = async () => {
    try {
      const token = getStoredToken();
      if (!token) return;
      const updated = await fetchCurrentUser(token);
      setUserData(updated);
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  const beneficiaryData = useMemo(() => {
    return {
      name: userData.name ?? "",
      birthDate: userData.birthDate ?? "",
      cpf: userData.cpf ?? "",
      phone: userData.phone ?? "",
      email: userData.email ?? "",
      emails: userData.additional_emails ?? [],
      phones: userData.phones ?? [],
    };
  }, [userData]);

  return (
    <div className="default">
      <Header onLogout={onLogout} />
      <MobileHeader
        userName={userData.name}
        cardNumber={userData.cardNumber ?? ""}
        operator={userData.operator ?? ""}
        open={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onSelectDashboard={() => {
          setMobileView("dashboard");
          setIsMobileMenuOpen(false);
        }}
        onSelectProfile={() => {
          setMobileView("profile");
          setIsMobileMenuOpen(false);
        }}
        onLogout={onLogout}
      />
      <div className="dashboard-content">
        <BeneficiaryCard
          {...beneficiaryData}
          className="layout-beneficiary"
          isMobileMenuOpen={isMobileMenuOpen}
          onRefreshUser={refreshUser}
        />
        {mobileView === "profile" && (
          <BeneficiaryCard
            {...beneficiaryData}
            className="mobile-beneficiary"
            onRefreshUser={refreshUser}
          />
        )}
        <main
          className={`main-content ${
            mobileView === "profile" ? "hidden-on-mobile" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
