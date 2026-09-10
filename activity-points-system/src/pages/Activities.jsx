import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Activities() {

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

  const filteredActivities = activities.filter(
    (activity) => {

      const matchesSearch =
        activity.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        activity.category === category;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <h1>My Activities</h1>

        <div className="filters">

          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option>All</option>
            <option>Technical</option>
            <option>Professional</option>
            <option>Sports</option>
            <option>Cultural</option>
            <option>Social Service</option>
            <option>Entrepreneurship</option>
            <option>Leadership</option>

          </select>

        </div>

        <div className="activity-list">

          {filteredActivities.map(
            (activity) => (

              <div
                className="activity-card"
                key={activity.id}
              >

                <div>

                  <h3>{activity.title}</h3>

                  <p>
                    {activity.description}
                  </p>

                  <small>
                    {activity.date} •{" "}
                    {activity.category}
                  </small>

                </div>

                <div className="points">

                  <strong>
                    {activity.pointsApproved}
                  </strong>

                  <span>
                    / {activity.pointsClaimed}
                  </span>

                  <small>
                    {activity.status}
                  </small>

                </div>

              </div>

            )
          )}

        </div>

      </main>

    </div>
  );
}

export default Activities;