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

exports.user_create = function (req, res,next) {
    let user = new User(
        {
            username: req.body.username,
            password: req.body.password
        }
    );

    user.save(function (err) {
        if (err) {
            res.json({
                message: 'Username exists',
                status: 400,
                error: err
            });
        }
        else{
            res.json({
                message: 'Sign up successful',
                status: 201
            });
        }
        
    })
};

exports.user_details = function (req, res,next) {
    User.find({username:req.params.username}, function (err, user) {
        if (err) {
            res.json({
                message: "Username does not exist",
                status: 400 
            });
        }
        else{
            if(user.length==0){
                res.json({
                    message: "Username does not exist",
                    status: 400 
                });
            }
            else{
                res.json({
                    status: 201,
                    message: "welcome",
                    data: user
                });
            }
            
        }
        
    })
};

exports.user_delete = function (req, res,next) {
     User.remove({ username: req.params.username }, function (err, something) {
                    console.log('inside Delete', something);
                if (err) return next(err);
                res.json({
                    message: "deleted",
                    status: 200});}
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
            res.json({
                message: 'category exists',
                status: 400,
                error: err
            });
        }
        else{
            res.json({
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
     Category.remove({ categoryName: req.params.categoryName }, function (err, something) {
                    console.log('inside Delete', something);
                if (err) return next(err);
                res.json({
                    message: "deleted",
                    status: 200});}
)};


exports.act_create = function (req, res,next) {
    User.find({username: req.body.username}, function(err,user){
        if(user.length==0){
            res.json({
                message: 'username does not exist',
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
                imgB64: req.body.imgB64
            }
        );

        act.save(function (err) {
            if (err) {
                res.json({
                    message: 'actid exists',
                    status: 400,
                    error: err
                });
            }
            else{
                res.json({
                    message: 'act creation successful',
                    status: 201
                });
            }
            
        })
    }
    });
    
    
};

exports.act_delete = function (req, res,next) {
     Act.remove({ actid: req.params.actid }, function (err, something) {
                    console.log('inside Delete', something);
                if (err) return next(err);
                res.json({
                    message: "deleted",
                    status: 200});}
)};

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
    
        Act.find({categoryName: req.params.categoryName}, function(err, acts){
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




