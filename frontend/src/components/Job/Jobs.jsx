import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import toast from "react-hot-toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Fetch user's saved job IDs so we can show filled/outlined bookmark
  useEffect(() => {
    if (user && user.role === "Job Seeker") {
      axios
        .get("http://localhost:4000/api/v1/job/saved", {
          withCredentials: true,
        })
        .then((res) => {
          const ids = res.data.savedJobs.map((job) => job._id);
          setSavedJobIds(ids);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handleToggleSave = async (jobId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/toggle-save/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.saved) {
        setSavedJobIds((prev) => [...prev, jobId]);
      } else {
        setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              const isSaved = savedJobIds.includes(element._id);
              return (
                <div className="card" key={element._id}>
                  {user && user.role === "Job Seeker" && (
                    <button
                      className={`bookmark-btn ${isSaved ? "saved" : ""}`}
                      onClick={() => handleToggleSave(element._id)}
                      title={isSaved ? "Unsave Job" : "Save Job"}
                    >
                      {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
                    </button>
                  )}
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
