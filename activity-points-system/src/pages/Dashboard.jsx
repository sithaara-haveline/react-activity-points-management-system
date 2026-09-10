import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Target
} from "lucide-react";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    if (!student) return;

    const loadActivities = async () => {

      const response = await fetch(
        "/data/activities.json"
      );

      const data = await response.json();

      const storedActivities =
        JSON.parse(
          localStorage.getItem("newActivities")
        ) || [];

      const studentActivities = [
        ...data.filter(
          (activity) =>
            activity.uid === student.uid
        ),

        ...storedActivities.filter(
          (activity) =>
            activity.uid === student.uid
        )
      ];

      setActivities(studentActivities);

    };

    loadActivities();

  }, [student?.uid]);


  /* POINT CALCULATIONS */

  const totalPoints = activities.reduce(
    (total, activity) =>
      total + Number(activity.pointsApproved || 0),
    0
  );

  const claimedPoints = activities.reduce(
    (total, activity) =>
      total + Number(activity.pointsClaimed || 0),
    0
  );

  const pendingActivities =
    activities.filter(
      (activity) =>
        activity.status === "Pending"
    ).length;

  const remainingPoints = Math.max(
    Number(student?.targetPoints || 0) -
      totalPoints,
    0
  );

  const progress =
    student?.targetPoints
      ? Math.min(
          (totalPoints /
            student.targetPoints) *
            100,
          100
        )
      : 0;


  /* CATEGORY TOTALS */

  const categoryPoints = {};

  activities.forEach((activity) => {

    const category =
      activity.category;

    categoryPoints[category] =
      (categoryPoints[category] || 0) +
      Number(activity.pointsApproved || 0);

  });


  /* RECENT ACTIVITIES */

  const recentActivities =
    [...activities]
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      )
      .slice(0, 4);


  return (

    <div className="app">

      <Sidebar />

      <main className="main-content">

        {/* HEADER */}

        <header className="topbar">

          <div>

            <p className="eyebrow">
              STUDENT DASHBOARD
            </p>

            <h1>
              Welcome,{" "}
              {student?.name?.split(" ")[0]}
            </h1>

            <p className="welcome-text">
              Here's an overview of your
              activity points.
            </p>

          </div>

          <div className="topbar-profile">

            <div className="avatar">
              {student?.name
                ?.split(" ")
                .map(
                  (word) => word[0]
                )
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

          </div>

        </header>


        {/* STAT CARDS */}

        <section className="stats-grid">

          <div className="stat-card primary">

            <div className="stat-top">

              <span>
                Total Points
              </span>

              <div className="stat-icon">
                <CheckCircle2 size={16} />
              </div>

            </div>

            <h2>
              {totalPoints}
            </h2>

            <p>
              Points approved so far
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <span>
                Target Points
              </span>

              <div className="stat-icon">
                <Target size={16} />
              </div>

            </div>

            <h2>
              {student?.targetPoints || 0}
            </h2>

            <p>
              Required activity points
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <span>
                Remaining
              </span>

              <div className="stat-icon">
                <ArrowRight size={16} />
              </div>

            </div>

            <h2>
              {remainingPoints}
            </h2>

            <p>
              Points needed to reach target
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <span>
                Activities
              </span>

              <div className="stat-icon">
                <CalendarDays size={16} />
              </div>

            </div>

            <h2>
              {activities.length}
            </h2>

            <p>
              Total activities submitted
            </p>

          </div>

        </section>


        {/* MAIN DASHBOARD AREA */}

        <section className="dashboard-grid">


          {/* PROGRESS */}

          <div className="progress-card">

            <div className="section-title">

              <div>

                <h3>
                  Points Progress
                </h3>

                <p>
                  Your progress towards the
                  target
                </p>

              </div>

            </div>


            <div className="progress-content">

              <div
                className="progress-ring"
                style={{
                  background:
                    `conic-gradient(
                      #171923 ${progress}%,
                      #ececf1 ${progress}%
                    )`
                }}
              >

                <div className="ring-inner">

                  <strong>
                    {progress.toFixed(0)}%
                  </strong>

                  <span>
                    completed
                  </span>

                </div>

              </div>


              <div className="progress-info">

                <div className="progress-number">

                  <strong>
                    {totalPoints}
                  </strong>

                  <span>
                    / {student?.targetPoints || 0}
                    {" "}points
                  </span>

                </div>


                <div className="linear-progress">

                  <div
                    style={{
                      width:
                        `${progress}%`
                    }}
                  />

                </div>


                <p>

                  {remainingPoints === 0
                    ? "You've reached your activity points target."
                    : `${remainingPoints} more points needed to reach your target.`}

                </p>

              </div>

            </div>

          </div>


          {/* QUICK SUMMARY */}

          <div className="recent-card">

            <div className="section-title">

              <div>

                <h3>
                  Activity Summary
                </h3>

                <p>
                  Current submission status
                </p>

              </div>

            </div>


            <div className="summary-list">

              <div className="summary-row">

                <div className="summary-label">

                  <CheckCircle2 size={16} />

                  <span>
                    Approved
                  </span>

                </div>

                <strong>
                  {
                    activities.filter(
                      (activity) =>
                        activity.status ===
                        "Approved"
                    ).length
                  }
                </strong>

              </div>


              <div className="summary-row">

                <div className="summary-label">

                  <Clock3 size={16} />

                  <span>
                    Pending
                  </span>

                </div>

                <strong>
                  {pendingActivities}
                </strong>

              </div>


              <div className="summary-row">

                <div className="summary-label">

                  <Target size={16} />

                  <span>
                    Points Claimed
                  </span>

                </div>

                <strong>
                  {claimedPoints}
                </strong>

              </div>

            </div>


            <Link
              to="/activities"
              className="dashboard-link"
            >
              View all activities
              <ArrowRight size={14} />
            </Link>

          </div>

        </section>


        {/* RECENT ACTIVITIES */}

        <section className="recent-card dashboard-recent">

          <div className="section-title">

            <div>

              <h3>
                Recent Activities
              </h3>

              <p>
                Your latest submissions
              </p>

            </div>

            <Link
              to="/activities"
              className="text-button"
            >
              View all
            </Link>

          </div>


          <div className="dashboard-activity-list">

            {recentActivities.length > 0 ? (

              recentActivities.map(
                (activity) => (

                  <div
                    className="activity-item"
                    key={activity.id}
                  >

                    <div className="activity-icon">
                      <CalendarDays size={16} />
                    </div>

                    <div className="activity-info">

                      <strong>
                        {activity.title}
                      </strong>

                      <span>
                        {activity.category}
                        {" · "}
                        {activity.date}
                      </span>

                    </div>


                    <div className="activity-points">

                      <strong>
                        +{activity.pointsApproved || 0}
                      </strong>

                      <span>
                        {activity.status}
                      </span>

                    </div>

                  </div>

                )
              )

            ) : (

              <div className="dashboard-empty">

                <p>
                  No activities submitted yet.
                </p>

                <Link to="/add-activity">
                  Add your first activity
                </Link>

              </div>

            )}

          </div>

        </section>


        {/* CATEGORY OVERVIEW */}

        <section className="category-section">

          <div className="section-title">

            <div>

              <h3>
                Activity Categories
              </h3>

              <p>
                Your approved points by category
              </p>

            </div>

          </div>


          <div className="category-grid">

            {Object.keys(categoryPoints).length > 0 ? (

              Object.entries(categoryPoints)
                .map(
                  ([category, points]) => (

                    <div
                      className="category-card"
                      key={category}
                    >

                      <span className="category-symbol">
                        {category.charAt(0)}
                      </span>

                      <strong>
                        {category}
                      </strong>

                      <p>
                        {points} points
                      </p>

                    </div>

                  )
                )

            ) : (

              <p className="no-category-data">
                No approved activity points yet.
              </p>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;