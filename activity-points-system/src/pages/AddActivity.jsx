import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Send } from "lucide-react";
import Sidebar from "../components/Sidebar";

function AddActivity() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  const [form, setForm] = useState({
    title: "",
    category: "Technical",
    date: "",
    description: "",
    claimedPoints: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      id: Date.now(),
      uid: student.uid,
      title: form.title,
      category: form.category,
      date: form.date,
      description: form.description,
      pointsClaimed: Number(form.claimedPoints),
      pointsApproved: 0,
      status: "Pending"
    };

    const existing =
      JSON.parse(localStorage.getItem("newActivities")) || [];

    localStorage.setItem(
      "newActivities",
      JSON.stringify([...existing, newActivity])
    );

    setMessage("Activity submitted successfully.");

    setTimeout(() => {
      navigate("/activities");
    }, 1000);
  };

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <div className="page-header">
          <div>
            <p className="eyebrow">ACTIVITY POINTS</p>
            <h1>Add Activity</h1>
            <p className="subtitle">
              Submit a new activity for approval and points.
            </p>
          </div>

          <button
            className="back-button"
            onClick={() => navigate("/activities")}
          >
            <ArrowLeft size={15} />
            Back to Activities
          </button>
        </div>

        <div className="add-activity-layout">

          <section className="form-card">
            <div className="form-card-header">
              <div>
                <h2>Activity Details</h2>
                <p>Enter the details of the activity you completed.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Activity Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. AI Workshop"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={form.category}
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
                </div>

                <div className="form-group">
                  <label>Date</label>

                  <div className="input-with-icon">
                    <CalendarDays size={15} />
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Briefly describe the activity..."
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>

              <div className="form-group">
                <label>Points Claimed</label>
                <input
                  type="number"
                  name="claimedPoints"
                  placeholder="Enter points"
                  min="1"
                  value={form.claimedPoints}
                  onChange={handleChange}
                  required
                />
                <small>
                  Points will be reviewed before approval.
                </small>
              </div>

              {message && (
                <div className="success-message">
                  {message}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate("/activities")}
                >
                  Cancel
                </button>

                <button type="submit" className="submit-button">
                  <Send size={15} />
                  Submit Activity
                </button>
              </div>

            </form>
          </section>

          <aside className="submission-info">
            <div className="info-card">
              <h3>Submission Process</h3>

              <div className="process-step">
                <span>01</span>
                <div>
                  <strong>Submit</strong>
                  <p>Add the activity details and claimed points.</p>
                </div>
              </div>

              <div className="process-step">
                <span>02</span>
                <div>
                  <strong>Review</strong>
                  <p>Your activity will be marked as pending.</p>
                </div>
              </div>

              <div className="process-step">
                <span>03</span>
                <div>
                  <strong>Approval</strong>
                  <p>Approved points will be added to your total.</p>
                </div>
              </div>
            </div>

            <div className="info-note">
              <strong>Keep your details accurate</strong>
              <p>
                Make sure the activity title, date and claimed points
                match the supporting evidence.
              </p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}

export default AddActivity;