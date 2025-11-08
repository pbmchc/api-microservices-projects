import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', function (_, res) {
  res.sendFile('views/index.html', { root: import.meta.dirname });
});

app.get('/api/timestamp/{:date_string}', dateValidator, ({ unix, utc }, res) => {
  res.json({ unix, utc });
});

function dateValidator(req, res, next) {
  const { date_string } = req.params;

  let date;
  if (date_string) {
    date = !isNaN(date_string) ? new Date(parseInt(date_string * 1000, 10)) : new Date(date_string);
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

app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});
