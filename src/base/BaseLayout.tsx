import Header from "../components/Header/Header";
import "./BaseLayout.css";
import { useMemo, useState, type ReactNode } from "react";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import BeneficiaryCard from "../components/BeneficiaryCard/BeneficiaryCard";
import type { UserProfile } from "../types/user";

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

  const beneficiaryData = useMemo(() => {
    return {
      name: user.name ?? "",
      birthDate: user.birthDate ?? "",
      cpf: user.cpf ?? "",
      phone: user.phone ?? "",
      phones: user.phones ?? [],
      email: user.email ?? "",
      emails: user.emails ?? [],
    };
  }, [user]);

  return (
    <div className="default">
      <Header onLogout={onLogout} />
      <MobileHeader
        userName={user.name}
        cardNumber={user.cardNumber ?? ""}
        operator={user.operator ?? ""}
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
        />
        {mobileView === "profile" && (
          <BeneficiaryCard
            {...beneficiaryData}
            className="mobile-beneficiary"
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
