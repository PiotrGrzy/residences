const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Home = require('../models/Home');
const checkToken = require('../middleware/checkToken');
const upload = require('./upload');
const APIFeatures = require('../utils/apiFeatures');

// Get List of Homes

router.get('/', async (req, res) => {
  try {
    if (req.query.user) {
      const homes = await Home.find({ 'owner.id': req.query.user });
      res.status(200).json(homes);
    } else {
      const features = new APIFeatures(Home.find(), req.query).filter().sort();
      const homes = await features.query;
      res.status(200).json(homes);
    }
  } catch (err) {
    console.log(err);
    res.send(400).send('server error');
  }
});

// Get single Home

router.get('/:id', async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    res.status(200).json(home);
  } catch (err) {
    console.log(err);
  }
});

// Post New Home

router.post(
  '/',
  checkToken,
  [
    check('title', 'Please enter title')
      .not()
      .isEmpty(),
    check('rooms', 'Please enter number of rooms')
      .not()
      .isEmpty(),
    check('area', 'Please enter area')
      .not()
      .isEmpty(),
    check('price', 'Please enter price')
      .not()
      .isEmpty(),
    check('description', 'Please enter description')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    //console.log(req.body);

    try {
      const imagesUpload = upload.array('images', 8);
      let home = '';
      await imagesUpload(req, res, async function(err) {
        console.log(req.body);
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
          return res.status(400).json(errors.array());
        }

        const imagesUrls = req.files.map(image => image.location);

        const {
          owner,
          title,
          rooms,
          area,
          built,
          floor,
          price,
          description,
          location,
          date
        } = req.body;

        home = new Home({
          owner,
          title,
          rooms,
          area,
          built,
          floor,
          price,
          description,
          location,
          date
        });
        home.images = [...imagesUrls];

        await home.save();
        res.status(200).json(home);
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err });
    }
  }
);

// Update Home

router.patch('/:id', checkToken, async (req, res) => {
  try {
    const home = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(home);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete Home

router.delete('/:id', checkToken, async (req, res) => {
  try {
    await Home.findByIdAndRemove(req.params.id);
    res.status(200).send('Home deleted');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
