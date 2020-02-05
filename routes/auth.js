const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const decodeToken = require('../middleware/checkToken');

// Decode and check token and send user data back

router.get('/', decodeToken, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// Login user

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid username or password' });
      }
      const passwordCorrect = await bcrypt.compare(password, user.password);

      if (!passwordCorrect) {
        return res.status(400).json({ msg: 'Invalid username or password' });
      }
      const payload = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
