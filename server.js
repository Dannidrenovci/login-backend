const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ In-memory user store (temporary, just for testing)
const users = [
  { email: 'test@example.com', password: 'password123' }
];

// ✅ Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Logged in successfully!' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ✅ Signup Route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  users.push({ email, password });
  res.json({ success: true, message: 'Signup successful' });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

