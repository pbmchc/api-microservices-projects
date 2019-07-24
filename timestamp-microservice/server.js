var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (_, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get(
  '/api/timestamp/:date_string?',
  dateValidator,
  ({ unix, utc }, res) => {
    res.json({ unix, utc });
  }
);

function dateValidator(req, res, next) {
  let date;
  const { date_string } = req.params;

  if (date_string) {
    date = !isNaN(date_string)
      ? new Date(parseInt(date_string, 10))
      : new Date(date_string);
  } else {
    date = new Date();
  }

  const unix = date.getTime();

  if (!unix) {
    res.send({ error: 'Invalid Date' });
  }

  req.unix = unix;
  req.utc = date.toUTCString();
  next();
}

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});