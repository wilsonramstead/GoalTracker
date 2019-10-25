
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/GoalTracker");

var GoalSchema = new mongoose.Schema({
    Name: { type: String, minlength: 3, unique:true, required:true},
    Description: { type: String, minlength: 3, required:true},
    CreationDay: { type: String, required: true },
    UpdatedAt: { type: String, required: true },
    CurrentMonthName: { type: String, required: true},
    CurrentMonth: { type: Array, required: true},
    AllMonths: [],
}, {timestamps:true});

module.exports = mongoose.model("Goal", GoalSchema);