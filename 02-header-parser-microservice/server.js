import cors from 'cors';
import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile('views/index.html', { root: import.meta.dirname });
});

app.get('/api/whoami', infoExtractor, ({ userInfo }, res) => {
  res.json(userInfo);
});

function infoExtractor(req, _, next) {
  const { ip } = req;

  req.userInfo = {
    ipaddress: ip,
    language: req.header('Accept-Language'),
    software: req.header('User-Agent'),
  };

  next();
}

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
