import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AddActivity() {

  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Technical",
    date: "",
    description: "",
    pointsClaimed: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const newActivity = {
      id: Date.now(),
      uid: student.uid,
      title: formData.title,
      category: formData.category,
      date: formData.date,
      description: formData.description,
      pointsClaimed: Number(
        formData.pointsClaimed
      ),
      pointsApproved: 0,
      status: "Pending"
    };

    const existingActivities =
      JSON.parse(
        localStorage.getItem("newActivities")
      ) || [];

    localStorage.setItem(
      "newActivities",
      JSON.stringify([
        ...existingActivities,
        newActivity
      ])
    );

    setMessage(
      "Activity submitted successfully!"
    );

    setFormData({
      title: "",
      category: "Technical",
      date: "",
      description: "",
      pointsClaimed: ""
    });

    setTimeout(() => {
      navigate("/activities");
    }, 1000);
  };

  return (
    <div className="app">

      <Sidebar />

      <main className="main-content">

        <h1>Add Activity</h1>

        <p className="subtitle">
          Submit a new activity for approval.
        </p>

        <form
          className="activity-form"
          onSubmit={handleSubmit}
        >

          <label>Activity Title</label>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter activity title"
            required
          />

          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >

            <option>Technical</option>
            <option>Professional</option>
            <option>Sports</option>
            <option>Cultural</option>
            <option>Social Service</option>
            <option>Entrepreneurship</option>
            <option>Leadership</option>

          </select>

          <label>Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your activity"
            rows="5"
            required
          />

          <label>Points Claimed</label>

          <input
            type="number"
            name="pointsClaimed"
            value={formData.pointsClaimed}
            onChange={handleChange}
            min="1"
            required
          />

          <button type="submit">
            Submit Activity
          </button>

          {message && (
            <p className="success">
              {message}
            </p>
          )}

        </form>

      </main>

    </div>
  );
}

export default AddActivity;