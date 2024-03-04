const pool = require("../config/db.js");

const createSubmission = async (req, res) => {
  const { assignment_id, student_id, submission_text, submission_file } = req.body;

  try {
    const query = `
      INSERT INTO submissions (assignment_id, student_id, submission_text, submission_file)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const queryParams = [assignment_id, student_id, submission_text, submission_file];
    const { rows } = await pool.query(query, queryParams);

    res.status(201).json({
      error: false,
      message: "Submission created successfully.",
      data: rows[0],
    });
  } catch (err) {
    console.error("Error creating submission:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const getSubmissionById = async (req, res) => {
  const submissionId = req.params.id;

  try {
    const query = `SELECT * FROM submissions WHERE submission_id = $1`;
    const { rows } = await pool.query(query, [submissionId]);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Submission not found." });
    } else {
      res.status(200).json({ error: false, data: rows[0] });
    }
  } catch (err) {
    console.error("Error fetching submission:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const updateSubmission = async (req, res) => {
  const submissionId = req.params.id;
  const { submission_text, submission_file } = req.body;

  try {
    const query = `
      UPDATE submissions
      SET submission_text = $1, submission_file = $2
      WHERE submission_id = $3
      RETURNING *
    `;
    const queryParams = [submission_text, submission_file, submissionId];
    const { rows } = await pool.query(query, queryParams);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Submission not found." });
    } else {
      res.status(200).json({
        error: false,
        message: "Submission updated successfully.",
        data: rows[0],
      });
    }
  } catch (err) {
    console.error("Error updating submission:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const deleteSubmission = async (req, res) => {
  const submissionId = req.params.id;

  try {
    const query = `DELETE FROM submissions WHERE submission_id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [submissionId]);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Submission not found." });
    } else {
      res.status(200).json({
        error: false,
        message: "Submission deleted successfully.",
        data: rows[0],
      });
    }
  } catch (err) {
    console.error("Error deleting submission:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const gradeSubmission = async (req, res) => {
  const submissionId = req.params.id;
  const { grade } = req.body;

  try {
    const query = `
      UPDATE submissions
      SET grade = $1
      WHERE submission_id = $2
      RETURNING *
    `;
    const queryParams = [grade, submissionId];
    const { rows } = await pool.query(query, queryParams);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Submission not found." });
    } else {
      res.status(200).json({
        error: false,
        message: "Grade updated successfully.",
        data: rows[0],
      });
    }
  } catch (err) {
    console.error("Error grading submission:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const addRemarksToSubmission = async (req, res) => {
  const submissionId = req.params.id;
  const { remarks } = req.body;

  try {
    const query = `
      UPDATE submissions
      SET remarks = $1
      WHERE submission_id = $2
      RETURNING *
    `;
    const queryParams = [remarks, submissionId];
    const { rows } = await pool.query(query, queryParams);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Submission not found." });
    } else {
      res.status(200).json({
        error: false,
        message: "Remarks added successfully.",
        data: rows[0],
      });
    }
  } catch (err) {
    console.error("Error adding remarks to submission:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const markPhysicalWriteupComplete = async (req, res) => {
  const submissionId = req.params.id;

  try {
    const query = `
      UPDATE submissions
      SET physical_writeup_complete = TRUE
      WHERE submission_id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(query, [submissionId]);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Submission not found." });
    } else {
      res.status(200).json({
        error: false,
        message: "Physical write-up marked as complete.",
        data: rows[0],
      });
    }
  } catch (err) {
    console.error("Error marking physical write-up as complete:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

module.exports = {
  createSubmission,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
  gradeSubmission,
  addRemarksToSubmission,
  markPhysicalWriteupComplete,
};
