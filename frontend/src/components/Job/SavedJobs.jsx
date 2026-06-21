import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import { BsBookmarkFill } from "react-icons/bs";
import toast from "react-hot-toast";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/job/saved", {
        withCredentials: true,
      })
      .then((res) => {
        setSavedJobs(res.data.savedJobs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleUnsave = async (jobId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/toggle-save/${jobId}`,
        {},
        { withCredentials: true }
      );
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  if (user && user.role !== "Job Seeker") {
    return <Navigate to="/" />;
  }

  return (
    <section className="savedJobs page">
      <div className="container">
        <h1>MY SAVED JOBS</h1>
        {loading ? (
          <div className="loading-text">
            <p>Loading saved jobs...</p>
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <BsBookmarkFill />
            </div>
            <h4>No Saved Jobs Yet</h4>
            <p>
              Jobs you save will appear here. Browse available jobs and tap the
              bookmark icon to save them.
            </p>
            <Link to="/job/getall" className="browse-btn">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="banner">
            {savedJobs.map((job) => (
              <div className="card" key={job._id}>
                <button
                  className="bookmark-btn saved"
                  onClick={() => handleUnsave(job._id)}
                  title="Unsave Job"
                >
                  <BsBookmarkFill />
                </button>
                <p>{job.title}</p>
                <p>{job.category}</p>
                <p>{job.country}</p>
                {job.fixedSalary ? (
                  <p className="salary">₹{job.fixedSalary.toLocaleString()}</p>
                ) : (
                  <p className="salary">
                    ₹{job.salaryFrom?.toLocaleString()} - ₹
                    {job.salaryTo?.toLocaleString()}
                  </p>
                )}
                <Link to={`/job/${job._id}`}>Job Details</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedJobs;
