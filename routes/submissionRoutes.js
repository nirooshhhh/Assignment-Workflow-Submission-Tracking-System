const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

const {
  submitAssignment,
  getSubmissionsByAssignment,
} = require("../controllers/submissionController");

// Submit assignment
router.post("/:assignmentId", submitAssignment);

// Get submissions for assignment
router.get("/:assignmentId", getSubmissionsByAssignment);

router.get("/", async (req, res) => {
  const submissions = await Submission.find();
  res.json(submissions);
});

module.exports = router;