const mongoose = require('mongoose');

const childPlotSchema = new mongoose.Schema({
    parentPlotId: {type: String, required: true},
    plotLatitude: {type: Number, required: true},
    plotLongitude: {type: Number, required: true},

});

module.exports = mongoose.model('ChildPlot', childPlotSchema);