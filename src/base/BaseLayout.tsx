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
  return (
    <div className="default">
      <Header
        userName="Ana Paula"
        cardNumber="123456789"
        operator="FESUL"
        className="layout-header"
      />
      <MobileHeader
        userName="Ana Paula"
        cardNumber="123456789"
        operator="FESUL"
        open={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div className="dashboard-content">
        <BeneficiaryCard
          name="Maria Oliveira Santos"
          birthDate="01/08/1995"
          phone="(99) 99999-0450"
          email="teste@email.com"
          className="layout-beneficiary"
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
