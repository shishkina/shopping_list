var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
      item: String,
      quantity: Number,
      measurement: String
});

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item;
