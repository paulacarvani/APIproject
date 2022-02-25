const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;
const app = express();
app.use(bodyParser.json());

//Mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'pauadmin',
    password: 'carvani.1210',
    database: 'node20_mysql'
});

//route-home
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

//api customers
app.get('/customers', (req, res) => {
    const sql = 'SELECT * FROM customers';

    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not results');
        }
    });
});

app.get('/customers/:id', (req, res) => {
    const {id } = req.params
    const sql = `SELECT * FROM customers WHERE id = ${id}`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not result');
        }
    });
});


// it works!
app.post('/add', (req, res) => {
    const sql = 'INSERT INTO customers SET ?';
    const customerObj = {
        name: req.body.name,
        city: req.body.city
    };
// correct sintax in postman is (Body-raw-json)
// {
//    "id": 4,
//    "name": "Olivia",
//    "city": "Jamundi"
//}
    connection.query(sql, customerObj, error => {
        if (error) throw error;
        res.send('Customer Created');
    });
});

app.put('/update/:id', (req, res) => {
    res.send('Update customer');
});

app.delete('/delete/:id', (req, res) => {
    res.send('Delete Customer');
})

//check connection
connection.connect(error => {
    if (error) throw error;
    console.log ('Database server running!');
});

// cargar app
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
