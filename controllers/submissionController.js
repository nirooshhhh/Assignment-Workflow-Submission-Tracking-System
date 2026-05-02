const Submission = require("../models/Submission");
const Assignment = require("../models/Assignment");

// SUBMIT
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { studentName, content } = req.body;

    //  Check assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    //  DEADLINE CHECK
    if (new Date() > new Date(assignment.dueDate)) {
      return res.status(400).json({ message: "Submission deadline has passed" });
    }

    //  INPUT VALIDATION
    if (!studentName || !content) {
      return res.status(400).json({
        message: "Student name and content are required",
      });
    }

    //  Prevent duplicate submissions
    const existingSubmission = await Submission.findOne({
      assignmentId,
      studentName,
    });

    if (existingSubmission) {
      return res.status(400).json({
        message: "You have already submitted this assignment",
      });
    }

    //  Create submission
    const submission = await Submission.create({
      assignmentId,
      studentName,
      content,
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SUBMISSIONS
const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    //  Optional: check assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const submissions = await Submission.find({ assignmentId });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitAssignment,
  getSubmissionsByAssignment,
};