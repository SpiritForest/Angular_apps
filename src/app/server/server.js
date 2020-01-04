const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const WordModel = require('../models/word');

const uri = "mongodb+srv://dzmitry_zakhar:MgDBEA@1@englishdb-cj0ky.mongodb.net/test?retryWrites=true&w=majority";

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));

server.get('/database', (req, res) => {
  res.send('Hello world');
});

server.post('/database', (req, res) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (oError) => {
    if (oError) throw oError;
    console.log('sucessfully connected to the mongoDB');

    // create new word object
    const oWord = new WordModel({
      english: req.body.english || "",
      russian: req.body.russian || "",
      transcription: req.body.transcription || "",
      audioPath: req.body.audioPath || "",
      imagePath: req.body.imagePath || "",
      examples: req.body.examples || []
    });

    // save object to the mongoDB
    oWord.save((oError, oWord) => {
      if (oError) throw oError;
        console.log('saved successfully');

      // disconnect from database
      mongoose.disconnect();
    });
  });
});

server.listen(3000, () => {
  console.log('The application is running on 3000 port');
});
