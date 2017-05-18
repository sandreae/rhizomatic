var bodyParser = require('body-parser');  
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var superSecret = 'TheAmazingKreskin';
var _ = require('underscore');  


module.exports = function (app, express) {  
    var userRouter = express.Router();

    userRouter.post('/authenticate', function (req, res) {  
        User.findOne({
            email: req.body.email
        }).select('userName email password').exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'User not found'});
            } else {
                var validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({success: false, message: 'Wrong password'});
                } else {
                    var token = jwt.sign({
                        userName: user.userName,
                        email: user.email,
                        _id: user._id,
                        permissions: user.permissions
                    }, superSecret, {
                         expiresIn : 60*24
                    });

                    res.json({
                        success: true,
                        message: 'login ok',
                        token: token,
                        _id: user._id
                    });
                }
            }
        });
    });

    userRouter.get('/', function (req, res) {
        res.send({message: 'api is loaded'});
    });

    userRouter.get('/applicationInfo', function(req,res){  
        res.send({version: '1.0-apple', build: 'local'});
    });

    userRouter.use(function (req, res, next) {  
        var token = req.body.token || req.params.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err) {
                    return res.status(401).send({success: false, message: 'Failed to authenticate token'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            return res.status(401).send({success: false, message: 'No token provided'});
        }
    });

    userRouter.route('/users')
        .post(function (req, res) {
            var user = new User({
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password,
            permissions:req.query.permissions || []

        });
            
            user.save(function (err) {
                if (err) {
                    if (err.code === 11000) {
                        return res.send({success: false, message: 'Duplicate useruserName.'});
                    } else {
                        return res.send(err);
                    }
                } else {
                    res.send(user);
                }

            });
        })
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err) {
                    res.send(err);
                }
                res.send(users);
            })
        });

    userRouter.route('/users/:user_id')
        .get(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) res.send(err);
                res.send(user);
            })
        })
        .put(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) res.send(err);

                if (req.body.userName) user.userName = req.body.userName;
                if (req.body.email) user.email = req.body.email;
                if (req.body.password) user.password = req.body.password;
                if (req.body.permissions) user.permissions = req.body.permissions;

                user.save(function (err) {
                    if (err)res.send(err);
                    res.send(user);
                });
            });
        })
        .delete(function (req, res) {
            if (_.contains(req.decoded.permissions, 'admin')){
                User.remove({_id: req.params.user_id}, function (err, user) {
                    if (err) res.send(err);
                        res.json({});
                    })
                } else {
                    return res.status(403).send({success: false, message: 'User is not authorized to delete users'});
                }
            });
    return userRouter;
};