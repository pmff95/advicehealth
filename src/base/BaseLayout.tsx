import Header from "../components/Header";
import BeneficiaryCard from "../components/BeneficiaryCard";
import "./BaseLayout.css";
import type { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="default">
      <Header userName="Ana Paula" cardNumber="123456789" operator="FESUL" />
      <div className="dashboard-content">
        <BeneficiaryCard
          name="Maria Oliveira Santos"
          birthDate="01/08/1995"
          phone="(99) 99999-0450"
          email="teste@email.com"
        />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
