const express = require("express");
const router = express.Router();

const {
  submitAssignment,
  getSubmissionsByAssignment,
} = require("../controllers/submissionController");

// Submit assignment
router.post("/:assignmentId", submitAssignment);

// Get submissions for assignment
router.get("/:assignmentId", getSubmissionsByAssignment);

module.exports = router;