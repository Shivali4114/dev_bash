const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); 
app.use(cors()); 

const app = express();
const port = 3000;

// Path to store user data in a JSON file
const usersFilePath = path.join(__dirname, 'users.json');

// Load users from file
function loadUsers() {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath);
    const users = JSON.parse(data);
    console.log('Loaded Users:', users);  // Debug: Log the loaded users from users.json
    return users;
  }
  return [];
}

// In-memory store for users (loaded from the JSON file)
let users = loadUsers();
console.log('Users Array:', users);  // Debug: Log the loaded users array

// Serve static files (JavaScript, CSS, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the signup page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Serve the login page
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Serve the dashboard page (redirected after login)
app.get('/dashboard', (req, res) => {
  res.send('<h1>Welcome to your dashboard!</h1><p>You are logged in.</p>');
});

// Handle the signup form submission
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Log incoming signup data
  console.log('Signup Attempt:', { username, email, password });

  // Check if the user already exists (either username or email)
  const existingUser = users.find(user => user.username === username || user.email === email);
  if (existingUser) {
    console.log('User already exists:', existingUser);  // Debug: Log the existing user
    return res.send(`
      <h1>User already exists! Please <a href="/login.html">log in</a>.</h1>
      <p>Redirecting to login...</p>
      <script>
        setTimeout(function() {
          window.location.href = ""http://localhost:5500/views/login.html";
        }, 3000); // Redirect after 3 seconds
      </script>
    `);
  }

  // Add new user and save to file
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

// Handle the login form submission
app.post('/login', (req, res) => {
  const { username, email, password } = req.body;

  // Log the incoming login credentials for debugging
  console.log('Login Attempt:', { username, email, password });

  // Check login credentials by either email or username
  const user = users.find(u => 
    (u.username === username || u.email === email) && u.password === password
  );

  // Debug: Log the user found during login
  console.log('User Found:', user);

  if (user) {
    // Successful login, redirect to dashboard
    console.log('Login Successful:', user);
    res.json({ success: true });
  } else {
    // Incorrect credentials
    console.log('Login Failed: Incorrect credentials');
    res.send('Incorrect username/email or password');
  }
});

// Save users to file
function saveUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  console.log('Users Saved:', users); // Debug: Log the users being saved to users.json
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
