// Saving token after login
function loginAndSaveToken() {
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ username: 'test', password: '123' }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'page2.html';
    }
  });
}

// On page2.html, check token
function checkToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Not authenticated');
    window.location.href = 'index.html';
    return;
  }

  fetch('/protected', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('user-info').innerText = JSON.stringify(data);
  })
  .catch(() => {
    alert('Token expired or invalid');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
}
