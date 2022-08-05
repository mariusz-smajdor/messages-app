const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
  },
});

const db = mysql.createConnection({
  user: 'root',
  password: 'root',
  host: 'localhost',
  database: 'messages',
});

app.post('/message', (req, res) => {
  const { sender, recipient, title, message } = req.body.msgInfo;

  db.query(
    'INSERT INTO messages (sender, recipient, title, message) VALUES (?, ?, ?, ?)',
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

app.get('/message', (_, res) => {
  db.query('SELECT * FROM messages', (err, data) => {
    if (err) {
      res.send('Failed to fetch messages.');
    } else {
      res.send(data);
    }
  });
});

io.on('connection', socket => {
  socket.on('message', () => {
    socket.broadcast.emit('message');
  });
});

server.listen(process.env.PORT || 3001);
