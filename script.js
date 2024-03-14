// script.js
const baseURL = 'http://localhost:5000/api';

const signup = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${baseURL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    alert('User created successfully');
  } catch (error) {
    showError(error.message);
  }
};

const login = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    alert('Login successful');
  } catch (error) {
    showError(error.message);
  }
};

const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    showError('Authentication token missing');
    return;
  }

  try {
    const response = await fetch(`${baseURL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const data = await response.json();
    showProfile(data);
  } catch (error) {
    showError(error.message);
  }
};

const showProfile = (data) => {
  const profileContainer = document.getElementById('profile');
  profileContainer.innerHTML = `
    <h2>User Profile</h2>
    <div>Email: ${data.email}</div>
    <!-- Display other profile fields as needed -->
  `;
};

const showError = (message) => {
  const errorContainer = document.getElementById('error');
  errorContainer.textContent = message;
};
