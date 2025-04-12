document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const messageDiv = document.getElementById('message');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form from reloading the page
  
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
  
      // Validate inputs
      if (!username || !password) {
        messageDiv.innerHTML = "Both fields are required!";
        messageDiv.style.color = "red";
        return;
      }
  
      if (password.length < 6) {
        messageDiv.innerHTML = "Password must be at least 6 characters.";
        messageDiv.style.color = "red";
        return;
      }
  
      // Send signup data to the server
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })
      .then(res => res.text())  // Expecting HTML response for the redirect
      .then(data => {
        // Inject the response HTML to trigger the redirect
        document.body.innerHTML = data;
      })
      .catch(err => {
        console.error('Signup error:', err);
        alert('Error signing up.');
      });
    });
  });
  