import Header from "../components/Header/Header";
import "./BaseLayout.css";
import type { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

import { useState } from "react";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import BeneficiaryCard from "../components/BeneficiaryCard/BeneficiaryCard";

export default function BaseLayout({ children, onLogout }: BaseLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"dashboard" | "profile">(
    "dashboard"
  );

  const beneficiaryData = {
    name: "Maria Oliveira Santos",
    birthDate: "01/08/1995",
    cpf: "609.291.063-26",
    phones: ["(99) 99999-0450"],
    emails: ["teste@email.com"],
  };

  return (
    <div className="default">
      <Header onLogout={onLogout} />
      <MobileHeader
        userName="Ana Paula"
        cardNumber="123456789"
        operator="FESUL"
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
