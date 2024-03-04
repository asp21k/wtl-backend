const express = require("express");
const router = express.Router();
const {
  createSubmission,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  gradeSubmission,
  addRemarksToSubmission,
  markPhysicalWriteupComplete,
} = require("../controllers/submissionController");

// Submit a new assignment
router.post("/create", createSubmission);

// Get submission details by ID
router.get("/:id", getSubmissionById);

// Update submission details
router.put("/:id/update", updateSubmission);

// Delete submission
router.delete("/:id/delete", deleteSubmission);

// Grade submission
router.put("/:id/grade", gradeSubmission);

// Add remarks to submission
router.put("/:id/remarks", addRemarksToSubmission);

// Mark physical write-up as complete
router.put("/:id/complete", markPhysicalWriteupComplete);

module.exports = router;
