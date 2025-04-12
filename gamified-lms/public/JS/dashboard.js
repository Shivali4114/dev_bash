// dashboard.js

// Check if the user is logged in
const isLoggedIn = localStorage.getItem('isLoggedIn');
const userEmail = localStorage.getItem('userEmail');

// Show a personalized greeting if logged in
if (isLoggedIn === 'true') {
  document.getElementById('dashboardGreeting').innerText = `Welcome back, ${userEmail}!`;
} else {
  window.location.href = '/login.html'; // Redirect to login page if not logged in
}

// Example logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  window.location.href = '/login.html'; // Redirect to login after logout
});
