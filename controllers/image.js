const Clarifai = require("clarifai");
const fs = require("fs");
const formidable = require("formidable");

// Load Image Model
const ImageModel = require("../models/Image");

// Load image validations
const imageValidations = require("../validations/image");

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json("unable to work with API");
    });
};

const handleImage = (req, res) => {
  const newImage = new ImageModel(req.body);

  newImage
    .save()
    .then(image => res.json(image))
    .catch(err => res.status(400).json(err));
};

const handleApiCallForFile = (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    const base64str = base64_encode(files.file.path);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, { base64: base64str })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(400).json("unable to work with API");
      });
  });
};

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

module.exports = {
  handleImage,
  handleApiCall,
  handleApiCallForFile
};
