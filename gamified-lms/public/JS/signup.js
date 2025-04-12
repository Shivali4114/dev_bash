const express = require('express');
const router = express.Router();

// Handle signup
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Simulate the signup logic (e.g., save to database)
  console.log(`User signed up with username: ${username} and password: ${password}`);

  // After signup, send a success message with a link to login.html
  res.send('<h1>Signup successful! Please <a href="/login.html">log in</a></h1>');
});

module.exports = router;
