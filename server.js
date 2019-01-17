var express  = require("express");
var app      = express();                               
var morgan = require("morgan");            
var bodyParser = require("body-parser");    
var cors = require("cors");
var path = require("path");

const mongoose = require("mongoose");

const Plot = require("./backend/model/plot");
 
app.use(morgan("dev"));                                        
app.use(bodyParser.urlencoded({"extended":"true"}));            
app.use(bodyParser.json());                                     
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