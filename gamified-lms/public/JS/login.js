document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting the traditional way
  
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
  
    console.log("Email:", email, "Password:", password); // Log email and password for debugging
  
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Server response:", data);  // Log server response for debugging
      if (data.success) {
        window.location.href = '/dashboard'; // Redirect to the dashboard
      } else {
        alert(data.message); // Show error message
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred during login.');
    });
});
