var express  = require("express");
var app      = express();                               
var morgan = require("morgan");            
var bodyParser = require("body-parser");    
var cors = require("cors");
var path = require("path");

var fs = require('fs');

const mongoose = require("mongoose");

const Plot = require("./backend/model/plot");
const ChildPlot = require("./backend/model/childplot");
 
app.use(morgan("dev"));                                        
app.use(bodyParser.urlencoded({"limit": "10mb", "extended":"true"}));            
app.use(bodyParser.json({"limit": "50mb", "extended": "true"}));                                     
app.use(cors());
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect("mongodb+srv://meanuser:7v2XbhqPsWewtf9c@cluster0-wkekd.mongodb.net/geotag?retryWrites=true")
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(() => {
  console.log("Connection Failed to MongoDB");
});

app.post("/api/plots", (req, res, next) => {
  const plot = new Plot({
    plotName: req.body.plotName
  });
  plot.save()
  .then(newPlot => {
    res.status(201).json({
      message: "Plot Added Successfully",
      plotId: newPlot._id,
    });
  });
});

app.get("/api/plots", (req, res, next) => {

  Plot.find()
  .then(plots => {
    console.log(plots);
    res.status(200).json({
      message: "Plots Fetched Successfully!",
      plots: plots
    });
  });
});

app.delete("/api/plots/:id", (req, res, next) => {
  Plot.deleteOne({ _id: req.params.id })
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Plot Deleted Successfully!",
    });
  });
});

app.put("/api/plots/:id", (req, res, next) => {

  Plot.replaceOne({ _id: req.params.id}, 
    {
      id: req.body.id,
      plotName: req.body.plotName,
      plotLatitude : req.body.plotLatitude,
      plotLongitude : req.body.plotLongitude
    })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "From serverjs >>> Plot updated successfully"
      })
    })
    .catch(error => {
      console.log(error)
    });
});

app.get("/api/childplots/:id", (req, res, next) => {

  console.log(req.params.id);
  
  ChildPlot.find({ parentPlotId: req.params.id})
  .then(childplots => {
    console.log(childplots);
    res.status(200).json({
      message: "Plots Fetched Successfully!",
      childplots: childplots
    });
  })
});

app.post("/api/childplot", (req, res, next) => {

  console.log(" <<< API >>> ");
  console.log(req.body.plotName);
  console.log(req.body.parentPlotId);
  console.log(req.body.plotLatitude);
  console.log(req.body.plotLongitude);

  const childPlot = new ChildPlot({
    plotName: req.body.plotName,
    parentPlotId: req.body.parentPlotId,
    plotLatitude: req.body.plotLatitude,
    plotLongitude: req.body.plotLongitude,
    // plotImg: req.body.plotImg,
  });

  childPlot.save()
  .then(newChildPlot => {
    res.status(201).json({
      message: "Plot Added Successfully",
      plotId: newChildPlot._id,
    });
  })
  .catch(error => console.log(error));
});

app.delete("/api/childplots/:id", (req, res, next) => {
  ChildPlot.deleteOne({ _id: req.params.id })
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Plot Deleted Successfully!",
    });
  });
});

app.put("/api/childplots/:id", (req, res, next) => {
  ChildPlot.replaceOne({ _id: req.params.id },
    {
      id: req.body.id,
      plotName: req.body.plotName,
      parentPlotId: req.body.parentPlotId,
      plotLatitude : req.body.plotLatitude,
      plotLongitude : req.body.plotLongitude,
      plotPolygon: req.body.plotPolygon,
      plotArea: req.body.plotArea,
      plotImgData: req.body.plotImgData
    })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "From serverjs >>> Plot updated successfully"
      })
    })
    .catch(error => {
      console.log(error)
    });
});

 
app.use(express.static(path.resolve(__dirname, "www")));
// app.set('port', process.env.PORT || 5000);
const port = process.env.PORT || 5000;

// const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
// server.listen(port);

// // http.createServer(app , function() {}).listen(port);
app.listen(port ,function () {
  console.log("Express server listening on port " + port);
});