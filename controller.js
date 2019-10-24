
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
    edit: (req,res)=> {
        Goal.findOneAndUpdate({ _id: req.params.id }, { Name: req.body.Name, Type: req.body.Type, Description: req.body.Description, Skill1: req.body.Skill1, Skill2: req.body.Skill2, Skill3: req.body.Skill3}, {runValidators:true})
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