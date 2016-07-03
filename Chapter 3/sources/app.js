var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var contacts = require('./modules/contacts');
var http = require('http');
var url = require('url');

var app = express();

app.get('/contacts', (req, res) => {
			var get_params = url.parse(req.url, true).query;

			var output;

			res.format({
				'application/json': () => {
					output = JSON.stringify(contacts.list());
					theOtherOuput = JSON.stringify(contacts.query_by_arg(get_params.arg, get_params.value));
				},
				'text/xml': () => {
					output = contacts.listXml();
					theOtherOuput = contacts.queryByArgXml(get_params.arg, get_params.value);
				},
				default: () => {
					res.status(406).send('Not Acceptable');
				}
			})

			if (Object.keys(get_params).length === 0) {
				res.end(output);
			}
			else {
				res.end(theOtherOuput)
			}
		}
);

app.get('/contacts/:number', function(req, res) {
	res.format({
		'application/json': () => {
			res.end(JSON.stringify(contacts.query(req.params.number)));
		},
		'text/xml': () => {
			res.end(contacts.queryXml(req.params.number));
		},
		default: () => {
			res.status(406).end('Not Acceptable');
		}
	});
});

app.get('/groups', (req, res) => {
	res.format({
		default: () => {
			res.status(406).send('Not Acceptable');
		},
		'application/json': () => {
			res.send(JSON.stringify(contacts.list_groups()));
		},
		'text/xml': () => {
			res.send(contacts.listGroupXml());
		},
	});
});

app.get('/groups/:name', function(req, res) {
	var name = req.params.name;
	res.format({
		'application/json': () => {
			res.end(JSON.stringify(contacts.get_members(name)));
		},
		'text/xml': () => {
			res.end(contacts.getXmlMember(name))
		},
		default: () => {
			res.status(406).end('Not Acceptable');
		}
	})
});

http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});
