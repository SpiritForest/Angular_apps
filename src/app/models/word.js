const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const wordShema = new Schema({
    english: String,
    russian: String,
    imagePath: String,
    audioPath: String,
    transcription: String,
    examples: Object
});

const WordModel = mongoose.model('Word', wordShema);

module.exports = WordModel;