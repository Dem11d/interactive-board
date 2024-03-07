const express = require('express');
const app = express();
const exrpessWs = require('express-ws')(app);

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

const boardChangesCallbacks = {
    '1': [],
    '2': []
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
    boardChangesCallbacks[id] = [];
    res.send(boards[id]);

});

app.delete('/boards/:id', (req, res) => {
    const {id} = req.params;
    delete boards[id];
    delete boardChangesCallbacks[id];
    res.send('ok');
});

app.ws('/board-sockets/:boardId', function (ws, req) {

    const {boardId} = req.params;

    const board = boards[boardId];

    if (!board) {
        ws.send('Board not found');
        ws.close();
        return;
    }

    console.log(`new ws for boardId: ${boardId}`);

    const callbacks = boardChangesCallbacks[boardId];
    const callbackFunction = (change) => {
        ws.send(change);
    };

    callbacks.push(callbackFunction);

    ws.on('message', function (msg) {
        console.log(msg);
        
        callbacks.filter(cb => cb !== callbackFunction).forEach(cb => cb(msg));
    });

    ws.on('close', function () {
        console.log('ws closed');
        const index = callbacks.indexOf(callbackFunction);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    });
    
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
