import Header from "../components/Header";
import BeneficiaryCard from "../components/BeneficiaryCard";
import Guides from "../components/Guides";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Header userName="Ana Paula" cardNumber="123456789" operator="FESUL" />
      <div className="dashboard-content">
        <BeneficiaryCard
          name="Maria Oliveira Santos"
          birthDate="01/08/1995"
          phone="(99) 99999-0450"
          email="teste@email.com"
        />
        <Guides />
      </div>
    </div>
  );
}

