var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

var Users = [];

app.get('/signup', function (req, res) {
    res.render('signup');
});
app.post('/signup', function (req, res) {
    if (!req.body.id || !req.body.password) {
        res.status("400");
        res.send("Khong co id va pass");
    }
    else {
        Users.filter(function (user) {
            if (user.id === req.body.id) {
                res.render('signup', {message: "User da ton tai!"});
            }
        });
        var newUser = {id: req.body.id, password: req.body.password};
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('/protected_page');
    }
});

function checkSignIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        var err = new Error("Khong the dang nhap!");
        console.log(req.session.user);
        next(err);
    }
}

app.get('/protected_page', checkSignIn, function (req, res) {
    res.render('protected_page', {id: req.session.user.id})
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    console.log(Users);
    if (!req.body.id || !req.body.password) {
        res.render('login', {message: "Please enter both id and password"});
    }
    else {
        Users.filter(function (user) {
            if (user.id === req.body.id && user.password === req.body.password) {
                req.session.user = user;
                res.redirect('/protected_page');
            }
        });
        res.render('login', {message: "Invalid credentials!"});
    }
});

app.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log("user logged out.")
    });
    res.redirect('/login');
});

// chuyen de login trong truong hop k dang nhap dc!
app.use('/protected_page', function(err, req, res, next){
    console.log(err);
    //User should be authenticated! Redirect him to log in.
    res.redirect('/login');
});

app.listen(3000, function () {
    console.log("Server start...");
});


