
const mongoose = require('mongoose');


var GoalSchema = new mongoose.Schema({
    Name: { type: String, minlength: 3, unique:true, required:true},
    Description: { type: String, minlength: 3, required:true},
    CurrentMonth: [],
    AllMonths: [],

}, {timestamps:true});

module.exports = mongoose.model("Goal", GoalSchema);