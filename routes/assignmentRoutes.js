const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

// Create assignment
router.post("/", createAssignment);

// Get all assignments
router.get("/", getAllAssignments);

// Get single assignment
router.get("/:id", getAssignmentById);

// Update assignment
router.put("/:id", updateAssignment);

// Delete assignment
router.delete("/:id", deleteAssignment);

module.exports = router;