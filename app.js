const express = require('express');
const morgan = require('morgan');

const app = express();

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hi there, you are in the landing page' });
});

module.exports = app;
