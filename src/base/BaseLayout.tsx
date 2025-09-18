import Header from "../components/Header";
import BeneficiaryCard from "../components/BeneficiaryCard";
import "./BaseLayout.css";
import type { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

import { useState } from "react";
import MobileHeader from "../components/MobileHeader";

export default function BaseLayout({ children }: BaseLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"dashboard" | "profile">(
    "dashboard"
  );

  const beneficiaryData = {
    name: "Maria Oliveira Santos",
    birthDate: "01/08/1995",
    phone: "(99) 99999-0450",
    email: "teste@email.com",
  };

  return (
    <div className="default">
      <Header />
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
