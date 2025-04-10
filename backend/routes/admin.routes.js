// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const allowRole = require('../middleware/role.middleware');

router.get('/admin-data', verifyToken, allowRole('Admin'), (req, res) => {
  res.status(200).json({ msg: 'Welcome Admin!' });
});

module.exports = router;
