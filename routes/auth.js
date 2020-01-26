const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const auth = require('../middleware/checkToken');
// Get logged in user data

router.get('/', auth, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select('-password');
    // console.log(user);
    res.json(req.user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// Register new User
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
