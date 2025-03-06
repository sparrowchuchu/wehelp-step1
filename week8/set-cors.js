const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all domains (not recommended for production)
app.use(cors());

// Or enable CORS for specific domains only:
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://example.com']
// }));

app.get('/data', (req, res) => {
  res.json({ message: 'This is data from the server!' });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});