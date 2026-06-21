import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSavedJobs,
  getSingleJob,
  postJob,
  toggleSaveJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthenticated, postJob);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.put("/toggle-save/:jobId", isAuthenticated, toggleSaveJob);
router.get("/saved", isAuthenticated, getSavedJobs);
router.get("/:id", isAuthenticated, getSingleJob);

export default router;
