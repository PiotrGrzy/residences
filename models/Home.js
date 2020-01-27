const mongoose = require('mongoose');

const Location = mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true }
});

const HomeSchema = mongoose.Schema({
  //   ownerId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'users'
  //   },
  owner: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  title: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  build: {
    type: Number,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String }
  },
  images: [String]
});

module.exports = mongoose.model('home', HomeSchema, 'homes');
