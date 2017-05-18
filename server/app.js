const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const classifieds = require('./routes/classifieds');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('tiny'));

app.use('/javascripts', express.static(__dirname + "/../client/javascripts"));
app.use('/stylesheets', express.static(__dirname + "/../client/stylesheets"));
app.use('/views', express.static(__dirname + "/../client/views"));

app.use('/api/classifieds', classifieds);

app.get('*', function(req, res) {
  res.sendFile('layout.html', {root: './client/views'});
});

app.listen(process.env.PORT || 3000, function() {
  console.log(process.env.PORT)
  console.log("Listening on port 3000...");
});
