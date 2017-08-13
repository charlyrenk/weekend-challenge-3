var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('SELECT * FROM tasklist;', function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.send(result.rows);
				}
			});
		}
	});
});

router.post('/', function (req, res) {
	console.log('task post was hit!');
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('INSERT INTO tasklist (task) VALUES ($1);', [req.body.task], function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making database query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(201);
				}
			});
		}
	});
});

router.delete('/:id', function (req, res) {
	var taskId = req.params.id;
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			// when connecting to database failed
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			// when connecting to database worked!
			// query like this: UPDATE messages SET message='Have a really terrific day!' WHERE id=1;
			client.query('DELETE FROM taskList WHERE id=$1;', [taskId],
				function (errorMakingQuery, result) {
					done();
					if (errorMakingQuery) {
						console.log('Error making database query', errorMakingQuery);
						res.sendStatus(500);
					} else {
						res.sendStatus(200);
					}
				});
		}
	});

});

module.exports = router;