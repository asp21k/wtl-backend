const express = require("express");
// const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

// Middleware

// Routes
const userRoutes = require("./routes/userRoutes");
// const assignmentRoutes = require("./routes/assignmentRoutes");
// const submissionRoutes = require("./routes/submissionRoutes");
// const studentRoutes = require("./routes/studentRoutes");
// const teacherRoutes = require("./routes/teacherRoutes");

app.use("/api/users", userRoutes);
// app.use("/api/assignments", assignmentRoutes);
// app.use("/api/submissions", submissionRoutes);
// app.use("/api/students", studentRoutes);
// app.use("/api/teachers", teacherRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Internal Server Error");
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
