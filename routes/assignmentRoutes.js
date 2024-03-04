const express = require("express");
const router = express.Router();
const { createAssignment, getAssignmentById, updateAssignment, deleteAssignment, getSubmissionsForAssignment } = require("../controllers/assignmentController");

// Create a new assignment
router.post("/create", createAssignment);

// Get assignment details by ID
router.get("/:id", getAssignmentById);

// Update assignment details
router.put("/:id/update", updateAssignment);

// Delete assignment
router.delete("/:id/delete", deleteAssignment);

// Get submissions for a specific assignment
router.get("/:id/submissions", getSubmissionsForAssignment);

module.exports = router;
