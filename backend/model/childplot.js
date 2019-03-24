const mongoose = require('mongoose');

const childPlotSchema = new mongoose.Schema({
    plotName: {type: String, required: true},
    parentPlotId: {type: String, required: true},
    plotLatitude: {type: Number, required: true},
    plotLongitude: {type: Number, required: true},
    plotPolygon: {type: String, value:[String]},
    plotArea: {type: Number},
    plotImgData: {type: String},

});

module.exports = mongoose.model('ChildPlot', childPlotSchema);