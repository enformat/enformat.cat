var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ENFORMAT - Software Development' });
});

router.get('/privacy-policy', function(req, res, next) {
  res.render('privacy-policy', { title: 'ENFORMAT - Software Development' });
});

router.get('/development-operations-qa', function(req, res, next) {
  res.render('development-operations-qa', { title: 'ENFORMAT - Software Development' });
});

router.get('/containerize-your-platform', function(req, res, next) {
  res.render('containerize-your-platform', { title: 'ENFORMAT - Software Development' });
});




module.exports = router;
