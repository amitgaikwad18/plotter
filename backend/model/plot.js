const mongoose = require('mongoose');

const plotSchema = mongoose.Schema({
  plotName: {type: String, required: true},
  plotLatitude: {type: Number},
  plotLongitude: {type: Number},
});

module.exports = mongoose.model('Plot', plotSchema);
