const express = require('express');
const nodemailer = require('nodemailer');
const uuidv4 = require('uuid/v4');
const router = express.Router();

require('dotenv').config();

const users = [];

// Om Gmail te kunnen gebruiken als mail service moet je hier https://myaccount.google.com/lesssecureapps de gegeven optie aanvinken
// Anders zegt Nodemailer dat je login gegevens fout zijn
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_PROVIDER,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS
  }
});

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', async (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    verificationCode: uuidv4(),
    isVerified: false
  };

  const options = {
    from: process.env.EMAIL_PROVIDER,
    to: user.email,
    subject: 'Verify your Avans Speedmeet account.',
    html: `
      <h2>Welcome to the Speedmeet!</h2>
      <p>Click the link below to activate your speedmeet account.</p>
      <a href="http://localhost:3000/users/verify/${user.verificationCode}">Click here to verify!</a>
    `
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log(error);
    }
    else {
      console.log(`Verification email sent: ${ info.response }`);
    }
  });

  users.push(user);

  res.status(200).json(user);
});

router.get('/verify/:code', async (req, res, next) => {
  const { code } = req.params;
  const user = users.find((user) => user.verificationCode == code);
  if (user) {
    user.isVerified = true;
    res.send(`Thank you for activating your account ${user.name}`);
  }
  else {
    res.send(`Unable to find user with verification code: ${code}`);
  }
});

module.exports = router;
