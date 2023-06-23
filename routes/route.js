const express = require('express');
const router = express.Router();
const st_cont = require('../controllers/stationary'); 
router.get('/product',st_cont.getData);
router.post('/product',st_cont.postProduct);
router.get('/product/:id',st_cont.getDataBasedOnId);
router.put('/product/:id',st_cont.updateProduct);
module.exports = {router};