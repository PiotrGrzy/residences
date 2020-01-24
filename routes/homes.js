const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Home = require('../models/Home');
const checkToken = require('../middleware/checkToken');
const upload = require('./upload');

router.get('/', async (req, res) => {
  try {
    const homes = await Home.find();

    res.status(200).json(homes);
  } catch (err) {
    console.log(err);
    res.send(400).send('server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    // console.log(req.params.id);
    const home = await Home.findById(req.params.id);
    //  console.log(home);
    res.status(200).json(home);
  } catch (err) {
    console.log(err);
  }
});

router.post(
  '/',
  checkToken,
  [
    check('title', 'Please enter title')
      .not()
      .isEmpty(),
    check('rooms', 'Please enter rooms number')
      .not()
      .isEmpty(),
    check('area', 'Please enter area number')
      .not()
      .isEmpty(),
    check('price', 'Please enter price')
      .not()
      .isEmpty(),
    check('description', 'Please enter description')
      .not()
      .isEmpty(),
    check('location', 'Please enter location')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    //console.log(req.body);
    const imagesUpload = upload.array('images', 6);

    try {
      let home = '';
      await imagesUpload(req, res, async function(err) {
        //console.log(req.body);
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json(errors.array());
        // }

        const imagesUrls = req.files.map(image => image.location);

        const {
          owner,
          title,
          rooms,
          area,
          build,
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
          build,
          floor,
          price,
          description,
          location,
          date
        });
        home.images = [...imagesUrls];
        //console.log(home);
        await home.save();
        res.status(200).json(home);
      });
    } catch (err) {
      console.log(err);
    }
  }
);

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

router.delete('/:id', checkToken, async (req, res) => {
  try {
    await Home.findByIdAndRemove(req.params.id);
    res.status(200).send('Home deleted');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
