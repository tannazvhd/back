
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// MySQL
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'sakila'
});

connection.connect();


app.get('/actors/:letter', (req, res) => {
    let { letter } = req.params;

    connection.query('SELECT * FROM actor_info WHERE last_name LIKE ?', [letter + '%'] ,function (error, results) {
        if (error) throw error;
        res.json(results);
    });
});


app.get('/info/:id', (req, res) => {
    let { id } = req.params;

    connection.query('SELECT film_info FROM actor_info WHERE actor_id = ?', [ id ], (err, results) => {
        if (err) throw new Error(err);
        res.json(results);
    });

});



require('./routes/index')(app);
require('./services/errorHandler')(app);

module.exports = app;










