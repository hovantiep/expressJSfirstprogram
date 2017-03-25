var express = require('express');
var app = express();

// npm install --save cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//npm install --save express-session
var session = require('express-session');
app.use(session({secret: "Shh, its a secret!"}));


app.get('/', function (req, res) {
    res.cookie('name', 'gia tri').send('cookies start'); // set: name=gia tri
    console.log('Cookies: ', req.cookies); //hien thi cookies

    //Expires after 360000 ms from the time it is set.
    // res.cookie(name, 'value', {expire: 360000 + Date.now()});

    // clearCookie('foo');
});

// session luu so lan truy cap web
app.get('/session', function(req, res){
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    }else{
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

app.listen(3000, function () {
    console.log('Server start...');
});