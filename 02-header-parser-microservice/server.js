const PORT = process.env.PORT || 3000;
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static('public'));
app.enable('trust proxy');

app.get("/", function (_, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get(
  '/api/whoami',
  infoExtractor,
  ({ userInfo }, res) => res.json(userInfo)
);

function infoExtractor(req, _, next) {
  const { ip } = req;

  req.userInfo = {
    ipaddress: ip,
    language: req.header('Accept-Language'),
    software: req.header('User-Agent')
  };
  next();
}

const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});