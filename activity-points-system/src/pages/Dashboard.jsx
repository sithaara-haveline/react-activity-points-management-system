import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    fetch("/data/activities.json")
      .then((response) => response.json())
      .then((data) => {

        const studentActivities = data.filter(
          (activity) => activity.uid === student.uid
        );

        setActivities(studentActivities);

      });

  }, [student.uid]);

  const totalPoints = activities.reduce(
    (total, activity) =>
      total + activity.pointsApproved,
    0
  );

  const remainingPoints = Math.max(
    student.targetPoints - totalPoints,
    0
  );

  const progress =
    (totalPoints / student.targetPoints) * 100;

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <h1>Welcome, {student.name}</h1>

        <p className="subtitle">
          Here's an overview of your activity points.
        </p>

        <div className="stats">

          <div className="stat-card">
            <h3>Total Points</h3>
            <h2>{totalPoints}</h2>
          </div>

          <div className="stat-card">
            <h3>Target Points</h3>
            <h2>{student.targetPoints}</h2>
          </div>

          <div className="stat-card">
            <h3>Remaining</h3>
            <h2>{remainingPoints}</h2>
          </div>

          <div className="stat-card">
            <h3>Activities</h3>
            <h2>{activities.length}</h2>
          </div>

        </div>

        <div className="progress-section">

          <div className="progress-header">
            <span>Overall Progress</span>
            <span>
              {Math.min(progress, 100).toFixed(0)}%
            </span>
          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${Math.min(progress, 100)}%`
              }}
            />

          </div>

        </div>

        <div className="recent">

          <div className="section-header">

            <h2>Recent Activities</h2>

            <Link to="/activities">
              View All
            </Link>

          </div>

          {activities.slice(-4).reverse().map(
            (activity) => (

              <div
                className="activity-row"
                key={activity.id}
              >

                <div>
                  <strong>
                    {activity.title}
                  </strong>

                  <span>
                    {activity.category}
                  </span>
                </div>

                <div>
                  <strong>
                    +{activity.pointsApproved}
                  </strong>
                  <span>points</span>
                </div>

              </div>

            )
          )}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;