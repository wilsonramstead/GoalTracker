
const Goal = require('./models/goal');

module.exports = {
    index: (req,res) => {
        Goal.find({})
            .then(data => {
                res.json({message: "Success", data:data});
            })
            .catch(err => {
                res.json({ message: "Error", error:err})
            })
    },
    create: (req,res)=> {
        Goal.create(req.body)
            .then(data => {
                console.log("Data: ", data);
                res.json({ message: "Success", data:data});
            })
            .catch(err => {
                console.log("Error: ", err);
                res.json({ message: "Error", error:err});
            })
    },
    findOne: (req,res) => {
        Goal.findOne({_id: req.params.id})
            .then(data => {
                console.log("Data: ", data);
                res.json({ message: "Success", data:data});
            })
            .catch(err => {
                console.log("Error: ", err);
                res.json({ message: "Error: ", error:err});
            })
    },
    changeStatus: (req,res)=> {
        Goal.findOneAndUpdate({ _id: req.params.id }, { $set: { CurrentMonth: req.body } }, {runValidators:true})
        .then(data =>{
            console.log("Data: ", data);
            res.json({message: "Success", data:data});
        })
        .catch(err => {
            console.log("Error: ", err);
            res.json({message: "Error: ", err});
        })
    },
    editGoal: (req,res)=> {
        Goal.findOneAndUpdate({ _id: req.params.id }, { $set: { UpdatedAt: req.body.UpdatedAt, CurrentMonthName: req.body.CurrentMonthName, CurrentMonth: req.body.CurrentMonth, AllMonths: req.body.AllMonths } }, {runValidators:true})
        .then(data =>{
            console.log("Data: ", data);
            res.json({message: "Success", data:data});
        })
        .catch(err => {
            console.log("Error: ", err);
            res.json({message: "Error: ", err});
        })
    },
    delete: (req,res)=>{
        Goal.findOneAndDelete({ _id: req.params.id })
        .then(data => {
            console.log("Data: ", data);
            res.json({message: "Success", data:data});
        })
        .catch(err => {
            console.log("Error: ", err);
            res.json({message: "Error", error:err});
        })
    }
}