import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Profile() {

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    fetch("/data/activities.json")
      .then((res) => res.json())
      .then((data) => {

        setActivities(
          data.filter(
            (item) => item.uid === student.uid
          )
        );

      });

  }, [student.uid]);

  const totalPoints = activities.reduce(
    (sum, activity) =>
      sum + activity.pointsApproved,
    0
  );

  const approved = activities.filter(
    (a) => a.status === "Approved"
  ).length;

  const pending = activities.filter(
    (a) => a.status === "Pending"
  ).length;

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <h1>Student Profile</h1>

        <div className="profile-card">

          <div className="profile-avatar">
            {student.name.charAt(0)}
          </div>

          <div>

            <h2>{student.name}</h2>

            <p><b>UID: </b>{student.uid}</p>

            <p>
              <b>Department: </b>{student.department}
            </p>

          </div>

        </div>

        <div className="profile-details">

          <div>
            <strong>Semester: </strong>
            <span>{student.semester}</span>
          </div>

          <div>
            <strong>Email:  </strong>
            <span>{student.email}</span>
          </div>

          <div>
            <strong>Phone:  </strong>
            <span>{student.phone}</span>
          </div>

        </div>

        <h2>Points Summary</h2>

        <div className="stats">

          <div className="stat-card">
            <h3>Points Earned</h3>
            <h2>{totalPoints}</h2>
          </div>

          <div className="stat-card">
            <h3>Target</h3>
            <h2>{student.targetPoints}</h2>
          </div>

          <div className="stat-card">
            <h3>Approved Activities</h3>
            <h2>{approved}</h2>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <h2>{pending}</h2>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;