import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Tags,
  UserCircle,
  LogOut
} from "lucide-react";

function Sidebar() {

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/");
  };

  return (
    <aside className="sidebar">

      <div className="brand">
        <div className="brand-icon">A</div>

        <div>
          <h2>ActivityPoint</h2>
          <span>Student Portal</span>
        </div>
      </div>

      <nav className="navigation">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={19} />
          Dashboard
        </NavLink>

        <NavLink
          to="/activities"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <ClipboardList size={19} />
          My Activities
        </NavLink>

        <NavLink
          to="/add-activity"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <PlusCircle size={19} />
          Add Activity
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Tags size={19} />
          Categories
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <UserCircle size={19} />
          Profile
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <div className="student-mini">

          <div className="avatar">
            {student?.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div>
            <strong>
              {student?.name || "Student"}
            </strong>

            <span>
              {student?.uid || ""}
            </span>
          </div>

        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          <LogOut size={14} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;