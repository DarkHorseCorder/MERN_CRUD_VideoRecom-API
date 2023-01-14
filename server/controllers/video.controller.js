const db = require("../models");
const Video = db.videos;

exports.create = (req, res) => {
    if(!req.body.data){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    Video.create({ title: req.body.data.title, subtitle:req.body.data.subtitle, owner:req.body.owner}, function (err, adventure) {
        if(err){
            console.log(err)
            res.send({response:'failure'});
        }else{
            res.send({response:'success'});
        }
    });    
};

exports.getvideos = (req, res) => {
    Video.find({}, function (err, adventure) {
        if(err){
            res.send(err);
        }else{
            res.send({response:adventure});
        }
    });
};

exports.getuserdata = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    Video.find({owner : req.body.user}, function (err, adventure) {
        if(err){
            res.send(err);
        }else{
            res.send({response:adventure});
        }
    });
};

exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    Video.findByIdAndUpdate(req.body.id, { title : req.body.data.title, subtitle : req.body.data.subtitle}, function (err, adventure) {
        if(err){
            res.send(err);
        }else{
            if(adventure){
                res.send({response:'success'});
            }else{
                res.send({response:'failure'});
            }
        }
    });
};

exports.delete = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Video.deleteOne({_id : req.body.id}, function (err, adventure) {
        if(err){
            res.send(err);
        }else{
            console.log(req.body.id)
            if(adventure){
                res.send({response:'success'});
            }else{
                res.send({response:'failure'});
            }
        }
    });
};