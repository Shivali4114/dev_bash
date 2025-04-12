document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value; // Get email input
    const password = document.getElementById('password').value; // Get password input

    // Use Fetch API to send login data asynchronously
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Set content type as JSON
      },
      body: JSON.stringify({ email, password }) // Send email and password as JSON body
    })
    .then(res => res.json()) // Parse the JSON response from the backend
    .then(data => {
      const messageDiv = document.getElementById('loginMessage'); // Div to show messages
      if (data.success) {
        // If login successful, display success message
        messageDiv.innerHTML = `<h1>✅ Login Successful!</h1><p>${data.message}</p>`;
      } else {
        // If login failed, display error message
        messageDiv.innerHTML = `<h1>❌ Login Failed</h1><p>${data.message}</p>`;
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Error logging in.');
    });
  });
</script>