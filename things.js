
/**
 * Created by Tiep's on 16-Mar-17.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('GET router on things');
});

router.post('/', function (req, res) {
    res.send('POST router on things')
});

// xuat ra su dung trong file khac
module.exports = router;