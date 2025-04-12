const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS to allow requests from other ports
app.use(cors());

// Middleware for parsing form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Path to store user data in a JSON file
const usersFilePath = path.join(__dirname, 'users.json');

// Load users from file
function loadUsers() {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data); // Return users from the file
  }
  return [];
}

let users = loadUsers();  // Load users from the JSON file

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login page (This is served by the frontend)
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Serve the signup page (This is served by the frontend)
app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Handle login form submission (POST /login)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Log incoming login data for debugging
  console.log('Login Attempt:', { email, password });

  // Check if the user exists with the provided credentials
  const user = users.find(u => (u.email === email || u.username === email) && u.password === password);

  if (user) {
    // Successful login, send a JSON response with a success message
    console.log('Login Successful:', user);
    res.json({ success: true, message: `Welcome back, ${user.username}!` });
  } else {
    // Incorrect login credentials
    console.log('Login Failed: Incorrect credentials');
    res.json({ success: false, message: 'Incorrect email or password. Please try again.' });
  }
});

// Handle signup form submission (POST /signup)
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Log incoming signup data for debugging
  console.log('Signup Attempt:', { username, email, password });

  // Check if the user already exists (either username or email)
  const existingUser = users.find(user => user.username === username || user.email === email);
  if (existingUser) {
    console.log('User already exists:', existingUser);  // Log the existing user
    return res.send(`
      <h1>User already exists! Please <a href="/login.html">log in</a>.</h1>
      <p>Redirecting to login...</p>
      <script>
        setTimeout(function() {
          window.location.href = "http://localhost:5500/views/login.html";
        }, 3000); // Redirect after 3 seconds
      </script>
    `);
  }

  // Add the new user and save to the file
  users.push({ username, email, password });
  saveUsers(users);  // Save users to file

  res.send(`
    <h1>Account created successfully!</h1>
    <p>Redirecting to login page...</p>
    <script>
      setTimeout(function() {
        window.location.href = "http://localhost:5500/views/login.html";
      }, 3000);
    </script>
  `);
});

// Save users to the file
function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  console.log('Users Saved:', users); // Log the users being saved to users.json
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
