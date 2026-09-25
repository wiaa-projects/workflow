import { Link } from "react-router-dom";
import Notifications from "./Notifications";

function Sidebar() {
  return (
    <aside>
      <h2>WorkFlow</h2>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/team">Team</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <div className="sidebar-notifications">
        <Notifications />
      </div>
    </aside>
  );
}

export default Sidebar;