require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../config/db.js");
const generateUserToken = require("../utils/generateUserToken.js");

const signup = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

    const userQuery = `INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, role`;
    const userQueryParams = [username, hashedPassword, email, role];
    const userQueryData = await pool.query(userQuery, userQueryParams);

    const token = await generateUserToken(userQueryData.rows[0].user_id);

    res.status(201).json({
      error: false,
      message: "Signup Successful. Welcome aboard!",
      data: {
        token,
        user: userQueryData.rows[0],
      },
    });
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({
        error: true,
        message: "User with this email or username already exists! Please use a different email or username to create your account.",
      });
    } else {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error!" });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: true, message: "Username and password are required!" });
  }

  try {
    const userQuery = `SELECT * FROM users WHERE username = $1`;
    const userQueryParams = [username];
    const userQueryData = await pool.query(userQuery, userQueryParams);

    if (userQueryData.rowCount === 1) {
      const auth = await bcrypt.compare(password, userQueryData.rows[0].password);
      if (auth) {
        const token = await generateUserToken(userQueryData.rows[0].user_id);
        const user = userQueryData.rows[0];
        delete user.password;
        res.status(200).json({
          error: false,
          message: "Login Successful. Welcome back!",
          data: {
            token,
            user,
          },
        });
      } else {
        res.status(400).json({
          error: true,
          message: "Incorrect username or password. Please try again.",
        });
      }
    } else {
      res.status(404).json({
        error: true,
        message: "The provided username does not match any existing user account. Please verify your credentials or consider signing up if you do not have an account.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.token;
    const query = `DELETE FROM user_token WHERE token = $1`;
    const queryParams = [token];
    await pool.query(query, queryParams);

    res.status(200).json({ error: false, message: "Logout Successful. Have a great day!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal server error!" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
