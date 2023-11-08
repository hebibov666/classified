const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Favori ürün modeli
const favoriSchema = new Schema({
  userId: { type: String, required: true },
  productIds: { type: [String], default: [] },
});

const Favori = mongoose.model('Favori', favoriSchema);

module.exports = Favori;

