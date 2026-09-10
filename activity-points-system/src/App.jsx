import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, PlusCircle, Tags, UserCircle } from "lucide-react";
import "./index.css";

import Activities from "./pages/Activities";
import AddActivity from "./pages/AddActivity";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";

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
        <a className="nav-item active">
          <LayoutDashboard size={19} />
          Dashboard
        </a>

        <a className="nav-item">
          <ClipboardList size={19} />
          My Activities
        </a>

        <a className="nav-item">
          <PlusCircle size={19} />
          Add Activity
        </a>

        <a className="nav-item">
          <Tags size={19} />
          Categories
        </a>

        <a className="nav-item">
          <UserCircle size={19} />
          Profile
        </a>
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

function Dashboard() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        <header className="topbar">
          <div>
            <p className="eyebrow">STUDENT DASHBOARD</p>
            <h1>Good morning, Ananya</h1>
            <p className="welcome-text">
              Here's an overview of your activity points.
            </p>
          </div>

          <div className="topbar-profile">
            <div className="notification">⌕</div>
            <div className="avatar">AT</div>
          </div>
        </header>

        <section className="stats-grid">

          <div className="stat-card primary">
            <div className="stat-top">
              <span>Total Points</span>
              <div className="stat-icon">✦</div>
            </div>
            <h2>56</h2>
            <p>Points approved so far</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Target Points</span>
              <div className="stat-icon">◎</div>
            </div>
            <h2>100</h2>
            <p>Required activity points</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Remaining</span>
              <div className="stat-icon">↗</div>
            </div>
            <h2>44</h2>
            <p>Points needed to reach target</p>
          </div>
        </section>

        <section className="dashboard-grid">

          <div className="progress-card">

            <div className="section-title">
              <div>
                <h3>Points Progress</h3>
                <p>Your progress towards the target</p>
              </div>
            </div>

            <div className="progress-content">

              <div className="progress-ring">
                <div className="ring-inner">
                  <strong>56%</strong>
                  <span>completed</span>
                </div>
              </div>

              <div className="progress-info">
                <div className="progress-number">
                  <strong>56</strong>
                  <span>/ 100 points</span>
                </div>

                <div className="linear-progress">
                  <div style={{ width: "56%" }}></div>
                </div>

                <p>
                  You're more than halfway towards your activity
                  points target.
                </p>
              </div>

            </div>
          </div>

          <div className="recent-card">

            <div className="section-title">
              <div>
                <h3>Recent Activities</h3>
                <p>Your latest submissions</p>
              </div>

              <button className="text-button">
                View all
              </button>
            </div>

            <div className="activity-item">
              <div className="activity-icon technical">⌘</div>

              <div className="activity-info">
                <strong>AI Workshop</strong>
                <span>Technical · Aug 10</span>
              </div>

              <div className="activity-points">
                <strong>+10</strong>
                <span>Approved</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon cultural">✦</div>

              <div className="activity-info">
                <strong>Inter College Debate</strong>
                <span>Cultural · Aug 15</span>
              </div>

              <div className="activity-points">
                <strong>+8</strong>
                <span>Approved</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon social">♡</div>

              <div className="activity-info">
                <strong>Blood Donation Camp</strong>
                <span>Social Service · Aug 20</span>
              </div>

              <div className="activity-points">
                <strong>+10</strong>
                <span>Approved</span>
              </div>
            </div>

          </div>

        </section>

        <section className="category-section">

          <div className="section-title">
            <div>
              <h3>Activity Categories</h3>
              <p>Build points across different areas</p>
            </div>
          </div>

          <div className="category-grid">

            <div className="category-card">
              <span className="category-symbol">⌘</span>
              <strong>Technical</strong>
              <p>22 points</p>
            </div>

            <div className="category-card">
              <span className="category-symbol">✦</span>
              <strong>Cultural</strong>
              <p>8 points</p>
            </div>

            <div className="category-card">
              <span className="category-symbol">♡</span>
              <strong>Social Service</strong>
              <p>10 points</p>
            </div>

            <div className="category-card">
              <span className="category-symbol">◆</span>
              <strong>Leadership</strong>
              <p>10 points</p>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;