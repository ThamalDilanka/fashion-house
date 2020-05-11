// Import the module that gives from Send Grid email service
const sgMail = require('@sendgrid/mail');
const htmlToText = require('html-to-text');

// Email sending method
exports.sendEmail = async (to, subject, html) => {
	// Setting API key
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	// Build the email object
	const email = {
		to,
		from: process.env.EMAIL_FROM,
		subject,
		text: htmlToText.fromString(html),
		html,
	};

	// Sending email
	await sgMail.send(email);
};