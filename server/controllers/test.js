const db = require("../models");
const Test = db.tests;

exports.addData = (req, res) => {
    if(!req.body.data){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    Test.create(req.body.data).then(function(result,err){
        if(err){
            res.send(err);
        }else{
            Test.find({}, 'number name gender age', function (err, docs) {
                if(err){
                    res.send(err);
                }else{
                    res.send(docs);
                }
            })
        }
    })
};

exports.detail = (req, res) => {
    if(!req.body.data){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Test.findOne({_id:req.body.data},{description:1}).then(function(result,err){
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
};

exports.sendData = (req, res) => {
    Test.find({}, 'number name gender age', function (err, docs) {
        if(err){
            res.send(err);
        }else{
            res.send(docs);
        }
    })
};