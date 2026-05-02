const Assignment = require("../models/Assignment");
const { getAssignmentStatus } = require("../utils/statusHelper");

// CREATE
const createAssignment = async (req, res) => {
  try {
    const { title, subject, description, dueDate } = req.body;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const assignment = await Assignment.create({
      title,
      subject,
      description,
      dueDate,
      status: getAssignmentStatus(dueDate), 
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();

    const updatedAssignments = assignments.map((a) => {
      return {
        ...a._doc,
        status: getAssignmentStatus(a.dueDate), 
      };
    });

    res.json(updatedAssignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ONE
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Not found" });
    }

    const updatedAssignment = {
      ...assignment._doc,
      status: getAssignmentStatus(assignment.dueDate),
    };

    res.json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateAssignment = async (req, res) => {
  try {
    const updated = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.body.dueDate && {
          status: getAssignmentStatus(req.body.dueDate), 
        }),
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};