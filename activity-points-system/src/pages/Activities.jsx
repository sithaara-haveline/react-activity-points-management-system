import { useEffect, useState } from "react";
import { Search, Plus, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Activities() {
  const student = JSON.parse(localStorage.getItem("student"));
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!student) return;

    const loadActivities = async () => {
      const response = await fetch("/data/activities.json");
      const data = await response.json();

      const storedActivities =
        JSON.parse(localStorage.getItem("newActivities")) || [];

      const studentActivities = [
        ...data.filter((item) => item.uid === student.uid),
        ...storedActivities.filter((item) => item.uid === student.uid)
      ];

      setActivities(studentActivities);
    };

    loadActivities();
  }, [student?.uid]);

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || activity.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">

        <div className="page-header">
          <div>
            <p className="eyebrow">ACTIVITY RECORD</p>
            <h1>My Activities</h1>
            <p className="subtitle">
              View and track the activities you've submitted.
            </p>
          </div>

          <button
            className="add-button"
            onClick={() => navigate("/add-activity")}
          >
            <Plus size={16} />
            Add Activity
          </button>
        </div>

        <div className="activity-summary">
          <span>
            <strong>{activities.length}</strong> activities
          </span>

          <span>
            <strong>
              {activities.reduce(
                (total, activity) =>
                  total + Number(activity.pointsApproved || 0),
                0
              )}
            </strong>{" "}
            points approved
          </span>
        </div>

        <div className="activity-toolbar">

          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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

          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (

              <div className="activity-card" key={activity.id}>

                <div className="activity-card-main">

                  <div className="activity-category-dot"></div>

                  <div>
                    <h3>{activity.title}</h3>

                    <p>{activity.description}</p>

                    <div className="activity-meta">
                      <span>
                        <CalendarDays size={13} />
                        {activity.date}
                      </span>

                      <span>{activity.category}</span>
                    </div>
                  </div>

                </div>

                <div className="activity-card-points">

                  <div>
                    <strong>
                      {activity.pointsApproved || 0}
                    </strong>

                    <span>
                      / {activity.pointsClaimed}
                    </span>
                  </div>

                  <span
                    className={`status ${
                      activity.status
                        .toLowerCase()
                        .replace(" ", "-")
                    }`}
                  >
                    {activity.status}
                  </span>

                </div>

              </div>
            ))
          ) : (
            <div className="empty-activities">
              <h3>No activities found</h3>
              <p>
                Try changing your search or category filter.
              </p>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}

export default Activities;