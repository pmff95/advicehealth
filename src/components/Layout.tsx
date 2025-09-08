import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import BeneficiaryCard from "./BeneficiaryCard";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="dashboard">
      <Header userName="Ana Paula" cardNumber="123456789" operator="FESUL" />
      <div className="dashboard-content">
        <aside className="sidebar">
          <BeneficiaryCard
            name="Maria Oliveira Santos"
            birthDate="01/08/1995"
            phone="(99) 99999-0450"
            email="teste@email.com"
          />
          <nav className="side-nav">
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
