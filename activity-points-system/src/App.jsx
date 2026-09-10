import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardList, PlusCircle, Tags, UserCircle } from "lucide-react";
import "./index.css";

import Login from "./pages/Login";
import Activities from "./pages/Activities";
import AddActivity from "./pages/AddActivity";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function Sidebar() {
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
          <div className="avatar">AT</div>

          <div>
            <strong>Ananya Thomas</strong>
            <span>RSET001</span>
          </div>
        </div>
      </div>

    </aside>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login page */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Main pages */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/activities"
          element={<Activities />}
        />

        <Route
          path="/add-activity"
          element={<AddActivity />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;