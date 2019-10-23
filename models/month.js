
const mongoose = require('mongoose');

var MonthSchema = new mongoose.Schema({
    Name: { type: String, required:true},
    GoalID: { type: String, required:true },
    DayOne: { type: Boolean, default:false},
    DayTwo: { type: Boolean, default:false},
    DayThree: { type: Boolean, default:false},
    DayFour: { type: Boolean, default:false},
    DayFive: { type: Boolean, default:false},
    DaySix: { type: Boolean, default:false},
    DaySeven: { type: Boolean, default:false},
    DayEight: { type: Boolean, default:false},
    DayNine: { type: Boolean, default:false},
    DayTen: { type: Boolean, default:false},
    DayEleven: { type: Boolean, default:false},
    DayTwelve: { type: Boolean, default:false},
    DayThirteen: { type: Boolean, default:false},
    DayFourteen: { type: Boolean, default:false},
    DayFifteen: { type: Boolean, default:false},
    DaySixteen: { type: Boolean, default:false},
    DaySeventeen: { type: Boolean, default:false},
    DayEighteen: { type: Boolean, default:false},
    DayNineteen: { type: Boolean, default:false},
    DayTwenty: { type: Boolean, default:false},
    DayTwentytwo: { type: Boolean, default:false},
    DayTwentythree: { type: Boolean, default:false},
    DayTwentyfour: { type: Boolean, default:false},
    DayTwentyfive: { type: Boolean, default:false},
    DayTwentysix: { type: Boolean, default:false},
    DayTwentyseven: { type: Boolean, default:false},
    DayTwentyeight: { type: Boolean, default:false},
    DayTwentynine: { type: Boolean, default:false},
    DayThirty: { type: Boolean, default:false},
    DayThirtyone: { type: Boolean, default:false},
}, { timestamps: true });

var Month = mongoose.model('Month', MonthSchema);

module.exports = Month;