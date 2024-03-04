const pool = require("../config/db.js");

const createAssignment = async (req, res) => {
  const { title, description, deadline, created_by } = req.body;

  try {
    const query = `INSERT INTO assignments (title, description, deadline, created_by) VALUES ($1, $2, $3, $4) RETURNING *`;
    const { rows } = await pool.query(query, [title, description, deadline, created_by]);

    res.status(201).json({
      error: false,
      message: "Assignment created successfully.",
      data: rows[0],
    });
  } catch (err) {
    console.error("Error creating assignment:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const getAssignmentById = async (req, res) => {
  const assignmentId = req.params.id;

  try {
    const query = `SELECT * FROM assignments WHERE assignment_id = $1`;
    const { rows } = await pool.query(query, [assignmentId]);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Assignment not found." });
    } else {
      res.status(200).json({ error: false, data: rows[0] });
    }
  } catch (err) {
    console.error("Error fetching assignment:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const updateAssignment = async (req, res) => {
  const assignmentId = req.params.id;
  const { title, description, deadline } = req.body;

  try {
    const query = `UPDATE assignments SET title = $1, description = $2, deadline = $3 WHERE assignment_id = $4 RETURNING *`;
    const { rows } = await pool.query(query, [title, description, deadline, assignmentId]);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Assignment not found." });
    } else {
      res.status(200).json({
        error: false,
        message: "Assignment updated successfully.",
        data: rows[0],
      });
    }
  } catch (err) {
    console.error("Error updating assignment:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const deleteAssignment = async (req, res) => {
  const assignmentId = req.params.id;

  try {
    const query = `DELETE FROM assignments WHERE assignment_id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [assignmentId]);

    if (rows.length === 0) {
      res.status(404).json({ error: true, message: "Assignment not found." });
    } else {
      res.status(200).json({
        error: false,
        message: "Assignment deleted successfully.",
        data: rows[0],
      });
    }
  } catch (err) {
    console.error("Error deleting assignment:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const getSubmissionsForAssignment = async (req, res) => {
  const assignmentId = req.params.id;

  try {
    const query = `SELECT * FROM submissions WHERE assignment_id = $1`;
    const { rows } = await pool.query(query, [assignmentId]);

    res.status(200).json({ error: false, data: rows });
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

module.exports = {
  createAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getSubmissionsForAssignment,
};
