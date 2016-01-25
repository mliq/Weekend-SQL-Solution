var express = require("express");
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/orderme';

// gets orders for the given user
router.get("/", function(req, res) {
    // get params from req.query object
    var queryOptions = {
        userID: req.query.userID,
        startDate: req.query.startDate || '01-01-2010',
        endDate: req.query.endDate || '01-01-2016'
    };

    var results = [];

    pg.connect(connectionString, function (err, client, done) {
        var query = "SELECT users.name, addresses.address_type, addresses.address_street, orders.* \
            FROM orders \
            JOIN addresses \
                ON addresses.address_id = orders.ship_address_id \
            JOIN users \
                ON users.id = orders.user_id \
            WHERE orders.order_date between $1 AND $2 \
                AND orders.user_id = $3";

        var result = client.query(query, [queryOptions.startDate, queryOptions.endDate, queryOptions.userID]);

        // Stream results back one row at a time
        result.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        result.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

module.exports = router;