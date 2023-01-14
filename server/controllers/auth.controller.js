const db = require("../models");
const Users = db.users;

exports.verify = (req, res) => {
    if(!req.body.data){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Users.findOne({ username: req.body.data.username, password:req.body.data.password }, function (err, adventure) {
        if(err){
            res.send(err);
        }else{
            if(adventure){
                if(req.body.data.username == "admin")
                res.send({response:'admin'})
                else
                {
                    res.send({
                        response:'success',
                        username : adventure._id
                    });
                }
            }else{
                res.send({response:'failure'});
            }
        }
    });
};
exports.verifyregister = (req, res) => {
    if(!req.body.data){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    Users.findOne({ username: req.body.data.register_username}, function (err, adventure) {
        if(err){
            res.send(err);
        }else{
            if(adventure){
                res.send({response:'sameuserexist'});
            }else{
                Users.create({ username: req.body.data.register_username, password:req.body.data.register_password, video:false, music:false, food:false }, function (err, adventure) {
                    if(err){
                        console.log(err)
                        res.send({response:'failure'});
                    }else{
                        res.send({response:'success'});
                    }
                });
            }
        }
    });
    
};
exports.getusers = (req, res) => {
    Users.find({}, function (err, adventure) {
        if(err){
            res.send(err);
        }else{
            res.send({response:adventure});
        }
    });
};

exports.changeVideoState = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Users.findByIdAndUpdate(req.body.id, { video : req.body.stateValue}, function (err, adventure) {
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

exports.changeMusicState = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Users.findByIdAndUpdate(req.body.id, { music : req.body.stateValue}, function (err, adventure) {
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

exports.changeFoodState = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Users.findByIdAndUpdate(req.body.id, { food : req.body.stateValue }, function (err, adventure) {
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

exports.deleteUser = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Users.deleteOne({_id : req.body.id}, function (err, adventure) {
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
exports.eachuser = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    Users.findById(req.body.user, function (err, adventure) {
        if(err){
            console.log(err)
            res.send(err);
        }else{
            console.log(adventure)
            if(adventure){
                res.send({
                    response:'success',
                    userdata : adventure
                });
            }else{
                res.send({response:'failure'});
            }
        }
    });
};

exports.updateUser = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    Users.findByIdAndUpdate(req.body.user, {
            firstname : req.body.userdata.firstname, 
            lastname : req.body.userdata.lastname,
            address : req.body.userdata.address,
            tel : req.body.userdata.tel,
            email : req.body.userdata.email,
            username : req.body.userdata.username,
            password : req.body.userdata.password,
        }, function (err, adventure) {
        if(err){
            console.log(err)
            res.send(err);
        }else{
            console.log(req.body)
            console.log(adventure)
            if(adventure){
                res.send({response:'success'});
            }else{
                res.send({response:'failure'});
            }
        }
    });
};