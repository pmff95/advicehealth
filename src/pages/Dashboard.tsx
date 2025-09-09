import Guides from "../components/Guides";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <Guides />
      </div>
    </div>
  );
}
