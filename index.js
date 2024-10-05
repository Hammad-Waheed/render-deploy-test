const express = require('express');
const path = require('path');
const cors = require("cors");


// Conditional import for node-fetch
let fetch;
if (!globalThis.fetch) {
    fetch = require('node-fetch');
} else {
    fetch = globalThis.fetch;
}

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// Fetch exoplanet data and send it to the client
app.get('/', async (req, res) => {
   try {
    res.status(200).send('landing page')
   } catch (error) {
    console.log(error)
   }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});