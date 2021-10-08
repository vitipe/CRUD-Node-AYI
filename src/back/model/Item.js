const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
