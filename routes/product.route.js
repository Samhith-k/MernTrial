const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
// router.get('/test', product_controller.test);
// router.post('/create', product_controller.product_create);
// router.get('/',product_controller.all_product_detail)
// router.get('/:id', product_controller.product_details);
// router.put('/:id/update', product_controller.product_update);
// router.delete('/:id/delete', product_controller.product_delete);
router.post('/users',product_controller.user_create);
router.get('/users',product_controller.all_user_detail);
router.get('/users/:username',product_controller.user_details);
router.delete('/users/:username',product_controller.user_delete);
router.post('/categories',product_controller.category_create);
router.get('/categories',product_controller.all_category_detail);
router.delete('/categories/:categoryName',product_controller.category_delete);
router.post('/acts',product_controller.act_create);
router.get('/acts',product_controller.all_act_detail);
router.delete('/acts/:actid',product_controller.act_delete);
router.get('/categories/:categoryName/acts',product_controller.all_act_category_detail);
router.get('/categories/:categoryName/acts/size',product_controller.all_act_category_size);
module.exports = router;

