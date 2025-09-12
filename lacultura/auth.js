// Profile elements
const profileName = document.querySelector('h2.text-xl');
const profileDesc = document.querySelector('p.text-gray-600');

// Sign in elements
const signinBtn = document.getElementById('signin-btn');
const modal = document.getElementById('signin-modal');
const closeBtn = document.getElementById('close-modal');
const signinForm = document.getElementById('signin-form');

// Signup elements
const signupBtn = document.getElementById('signup-btn');
const signupModal = document.getElementById('signup-modal');
const closeSignup = document.getElementById('close-signup');
const signupForm = document.getElementById('signup-form');

// Check if user is logged in
window.addEventListener('DOMContentLoaded', () => {
  const storedUser = localStorage.getItem('loggedInUser');
  if (storedUser) {
    profileName.textContent = `Welcome ${storedUser}`;
    profileDesc.textContent = 'Profile personalized';
  }
});

// Show Sign In Modal
signinBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
});
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// Handle login
signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('loggedInUser', data.username);
      profileName.textContent = `Welcome ${data.username}`;
      profileDesc.textContent = 'Profile personalized';
      modal.classList.add('hidden');
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Error connecting to server');
  }
});

// Show Signup Modal
signupBtn.addEventListener('click', () => {
  signupModal.classList.remove('hidden');
  signupModal.classList.add('flex');
});
closeSignup.addEventListener('click', () => signupModal.classList.add('hidden'));

// Handle registration
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('signup-usernam
