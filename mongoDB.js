var express = require('express');
var app = express();
var mongoose = require('mongoose'); //mongoDB
var bodyParser = require('body-parser'); //url to Json
var multer = require('multer'); //multipart trong form
var upload = multer();

//dinh nghia view template
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data

//ket noi db
mongoose.Promise = global.Promise;
var url = "mongodb://localhost:27017/MyDB";
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.on('open', function () {
    console.log('Connected');
});

//tao colection
var khoaHoc = require('./schema.js');

// Them khoa hoc
app.get('/add', function (req, res) {//get method
    res.render('form');
});
app.post('/tutorials', function (req, res) { // post method
    var khoaHocInfo = req.body; //Get the parsed information
    if (!khoaHocInfo.ten || !khoaHocInfo.chu_thich) {
        res.render('show_message', {message: "Chua cung cap thong tin", type: "error"}); //hien thi trang loi
    }
    else {
        var newKhoaHoc = new khoaHoc({
            ten: khoaHocInfo.ten,
            chu_thich: khoaHocInfo.chu_thich,
        });
        newKhoaHoc.save(function (err) {
            if (err) {
                res.render('show_message', {message: "Loi CSDL", type: "error"});
            }
            else {
                res.render('show_message', {message: "Khoa moi da duoc them", type: "success", khoaHoc: khoaHocInfo});
                khoaHoc.find({}, function (err, data) {//in dl ra cmd
                    if (err) throw err;
                    console.log(data);
                });
            }
        });
    }
});

// danh sach khoa hoc
app.get('/list', function (req, res) {
    khoaHoc.find(function (err, response) {
        res.json(response);
    });
});
//tim khoa hoc
app.get('/find/:name', function (req, res) {
    khoaHoc.find({ten: req.params.name}, function (err, response) {
        res.json(response);
    });
});


app.listen(3000, function () {
    console.log("Server started...");
});




