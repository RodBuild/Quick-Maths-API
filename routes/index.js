const router = require('express').Router();
const path = require('path');
const html = '../frontend/index.html';

router.use('/easy', require('./easy'));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, html));
  // res.send('ok')
});

module.exports = router;
