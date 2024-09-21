const express = require('express');
const app = express();
const port = 3000;

// Basic route
app.get('/hello', (req, res) => {
  res.send('Hello, Mannu!');
})
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})
