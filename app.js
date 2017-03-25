var express = require('express');
var app = express();

//npm install --save pug : template
app.set('view engine', 'pug');
app.set('views', './views');



app.get('/first_template', function (req, res) {
    res.render('first_view');
});
app.get('/dynamic_view', function (req, res) {
    res.render('dynamic', {
        name: "Co ban expressJS",
        url: "http://www.tutorialspoint.com"
    });
});
app.get('/condition_view', function (req, res) {
    res.render('condition', {
        user: {name: "tiep", age: "29"}
    })
});
app.get('/components', function (req,res) {
    res.render('content');
})
// end pug

//static files
app.use(express.static('public')); //need to enable it using the following built-in middleware.
app.get('/static_file_test', function (req,res) {
    res.render('static_file_test');
})

//end static file


var things = require('./things.js'); // app.js va things.js cung thu muc
app.use('/things', things);

app.get('/:id([0-9]{5})/:name', function (req, res) { // regx id la so gom 5 chu so
    res.send('ID cua ban la: ' + req.params.id + ' Ten ban la: ' + req.params.name);
});

//=== <Middleware> ===
//First middleware before response is sent
app.use(function (req, res, next) {
    console.log("Start");
    next();
});
//Route handler
app.get('/', function (req, res, next) {
    res.send("Middle");
    next();
});

app.use('/', function (req, res) {
    console.log('End');
});
//=== </Middleware> ===

// sai URL thi dua ra trang loi
app.get('*', function (req, res) {
    res.send('Sai duong dan, 404!');
});




app.listen(3000, function () {
    console.log("Server started...");
});