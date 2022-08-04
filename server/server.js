const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: 'root',
  password: 'root',
  host: 'localhost',
  database: 'messages',
});

app.post('/message', (req, res) => {
  const { sender, recipient, title, message } = req.body.msgInfo;

  db.query(
    'INSERT INTO messages (sender, recipient, title, message) VALUES (?, ?, ?, ?)' /
      [sender, recipient, title, message],
    err => {
      if (err) {
        res.send('Something went wrong.');
      } else {
        res.send('Message has been sent.');
      }
    }
  );
});

app.listen(process.env.PORT || 3001);
