const Product = require('../models/product.model');
const User = require('../models/userModel');
const Act = require('../models/actModel');
const Category = require('../models/categoryModel');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.product_create = function (req, res,next) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.all_product_detail=function(req,res,next){
	
	    Product.find({}, function(err, products){
       if(err){
           console.log(err);
       } else {
          res.send(products);
       }
});
}




exports.product_details = function (req, res,next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res,next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res,next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.user_create = function (req, res,next){
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password
        }
    );

    user.save(function (err) {
        if (err) {
            res.status(400).json({
                message: 'Username exists',
                status: 400,
                error: err
            });
        }
        else{
            res.status(201).json({
                message: 'Sign up successful',
                status: 201
            });
        }
        
    })
};

exports.user_details = function (req, res,next) {
    User.find({username:req.params.username}, function (err, user) {
        console.log(req.params.username);        
        if (err) {
            res.status(400).json({
                message: "Username does not exist",
                status: 400 
            });
        }
        else{
            if(user.length==0){
                res.status(400).json({
                    message: "Username does not exist",
                    status: 400 
                });
            }
            else{
                res.status(201).json({
                    status: 201,
                    message: "welcome",
                    data: user
                });
            }
            
        }
        
    })
};

exports.user_delete = function (req, res,next) {
     User.find({username:req.params.username}, function (err, user){
        if(user.length==0){
                res.status(400).json({
                    message: "Username does not exist",
                    status: 400 
                });
            }
        else{
            User.remove({ username: req.params.username }, function (err, something) {
                    console.log('inside Delete', something);
                if (err) return next(err);
                res.status(200).json({
                    message: "deleted",
                    status: 200});}
)
        }
     })
};

exports.user_login = function (req, res,next) {
     User.find({ username: req.body.username }, function (err, user) {
                console.log(req.body);
                if (err) return next(err);
                if(user.length==0){

                    res.status(401).json({
                        message: "username does not exist",
                        status: 401
                    })
                }
                else{
                    if(user[0].password==req.body.password){
                        res.status(200).send(user);
                    }
                    else{
                        res.status(401).json({
                            message: "invalid password",
                            status: 401
                       })
                    }
                }
                console.log(user);
        }
)};


exports.all_user_detail=function(req,res,next){
    
        User.find({}, function(err, users){
       if(err){
           console.log(err);
       } else {
          res.json({
            message : "all users",
            data: users
          });
       }
});
}


exports.category_create = function (req, res,next) {
    let category = new Category(
        {
            categoryName: req.body.categoryName
            
        }
    );
    category.save(function (err) {
        if (err) {
            res.status(400).json({
                message: 'category exists',
                status: 400,
                error: err
            });
        }
        else{
            res.status(201).json({
                message: 'category successful',
                status: 201
            });
        }
    })
};

exports.all_category_detail=function(req,res,next){
        Category.find({}, function(err, category){
       if(err){
           console.log(err);
       } else {
          res.json({
            message : "all category",
            data: category
          });
       }
});
}

exports.category_delete = function (req, res,next) {
     Category.find({categoryName: req.params.categoryName},function(err,category){
        if(category.length==0){
            res.status(400).json({
                message: 'category does not exist',
                status: 400,
            });
        }
        else{
            Category.remove({ categoryName: req.params.categoryName }, function (err, something) {
                    console.log('inside Delete', something);
                if (err) return next(err);
                res.status(200).json({
                    message: "deleted",
                    status: 200});}
)
        }
     })
     };


exports.act_create = function (req, res,next) {
    User.find({username: req.body.username}, function(err,user){
        if(user.length==0){
            res.status(401).json({
                message: 'username does not exist',
                status: 401,        
            });
        }
        else{
            Category.find({categoryName: req.body.categoryName}, function(err,category){
                if(category.length==0){
                    res.status(401).json({
                        message: 'category does not exist',
                        status: 401,        
                    });
                }
                else{
                    let act = new Act(
            {
                username: req.body.username,
                actid: req.body.actid,
                caption: req.body.caption,
                upvotes: req.body.upvotes,
                timestamp: req.body.timestamp,
                imgB64: req.body.imgB64,
                categoryName: req.body.categoryName
            }
        );

        act.save(function (err) {
            if (err) {
                res.status(400).json({
                    message: 'actid exists',
                    status: 400,
                    error: err
                });
            }
            else{
                res.status(201).json({
                    message: 'act creation successful',
                    status: 201
                });
            }
        })
        
                }
            });
    }
    });
};

exports.act_delete = function (req, res,next) {
     Act.find({ actid: req.params.actid }, function (err, act){
        if(act.length==0){
            res.status(400).json({
                    message: "act id does not exist",
                    status: 400});
        }
        else{
            Act.remove({ actid: req.params.actid }, function (err, something) {
                    console.log('inside Delete', something);
                if (err) return next(err);
                res.status(200).json({
                    message: "deleted",
                    status: 200});}
)
        }
     })
     };

exports.all_act_detail=function(req,res,next){
        Act.find({}, function(err, acts){
       if(err){
           console.log(err);
       } else {
          res.json({
            message : "all acts",
            data: acts
          });
       }
});
}

exports.all_act_category_detail=function(req,res,next){
        console.log(req.query, req.params);

        const {
            start,
            end,
        } = req.query;

        const buildQuery = start && end && start-end<=100 ? 
        {
            categoryName: req.params.categoryName,
            actid: {
                $gt: start,
                $lt: end,
            },
        } : 
        {
            categoryName: req.params.categoryName,   
        };
    
        Act.find(buildQuery, function(err, acts){
       if(err){
           console.log(err);
       } else {
          res.json({
            message : "all acts",
            data: acts
          });
       }
});
}

exports.all_act_category_size=function(req,res,next){
        Act.find({categoryName: req.params.categoryName}, function(err, acts){
       if(err){
           console.log(err);
       } else {
          res.send([acts.length]);
       }
});
}

exports.act_upvote = function (req, res,next) {
     Act.findOne({ actid: req.body.actid }, function (err, act) {
        if (err) return next(err);
        console.log(act);
        if(act.length==0){
            res.status(400).json({
                status: 400,
                message: "act does not exist"
            });
        }
        else{
            var myquery = {actid: req.body.actid};
            var up=act.upvotes+1;
            var newvalues = {$set: {upvotes: up}};
            Act.updateOne(myquery,newvalues,function(err,res){
                if(err)
                    throw err;
            });            
            res.status(200).json({
                status: 200,
                message: "upvote successful"
            })
        }
    });
}

