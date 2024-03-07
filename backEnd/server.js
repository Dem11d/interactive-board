const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.json());
const port = 3000;

const boards = {
    '1': {
        id: '1',
        name: 'Board 1',
        canvas: null
    },
    '2': {
        id: '2',
        name: 'Board 2',
        canvas: null
    }
};

// GET endpoint
app.get('/boards', (req, res) => {
    // Handle GET request logic here
    res.send(Object.keys(boards).map(boardId => ({
        ...boards[boardId],
        canvas: undefined
    })));
});

// create a new GET API with a path variable and echo the variable to the console
app.get('/boards/:id', (req, res) => {
    console.log(req.params.id);

    const board = boards[req.params.id];
    if (board) {
        res.send(board);
    } else {
        res.status(404).send('Board not found');
    }
});

// POST endpoint
app.post('/boards', (req, res) => {
    // Handle POST request logic here
    const id = Math.random().toString(36).substring(7);
    // set the board name from the request body
    boards[id] = {
        id,
        name: req.body.name,
        canvas: null
    };
    res.send(boards[id]);

});

// WebSocket server
const wss = new WebSocket.Server({ server: app });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Echo the received message back to the client
        ws.send(message);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
