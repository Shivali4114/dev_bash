document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent page refresh
  
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      const messageBox = document.getElementById('message');
  
      if (data.success) {
        messageBox.innerHTML = '<p style="color: green;">✅ Login Successful! You can now access the dashboard from the Home tab.</p>';
      } else {
        messageBox.innerHTML = `<p style="color: red;">❌ ${data.message || 'Login failed'}</p>`;
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      document.getElementById('message').innerHTML = '<p style="color: red;">Error logging in.</p>';
    });
  });
  