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


module.exports = router;

