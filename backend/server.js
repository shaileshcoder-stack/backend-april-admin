const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
const app = express();

connectDB(); // MongoDB connect

app.use(cors());
app.use(express.json());
app.use('/api/admin', require('./routes/admin.routes'));
// Routes
app.use('/api/auth', require('./routes/auth.routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
