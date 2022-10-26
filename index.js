const express = require('express')
var cors = require('cors');
const { resolve } = require('path');
const app = express()
app.use(cors());

app.get('/test/index', async (req, res) => {
    res.send('ini index')
});

app.get('/test', async (req, res) => {
    res.send('ini test')
});

app.get('/', async (req, res) => {
    res.send('ini index 2')
});

app.get('/test/socket', async (req, res) => {
    res.send('Hello Express!')
    let tmp = [
        {
            sheet: 'R1',
            total: 35
        },
        {
            sheet: 'R2',
            total: 20
        },
        {
            sheet: 'R3',
            total: 30
        },
        {
            sheet: 'R4',
            total: 40
        },
        {
            sheet: 'R5',
            total: 15
        },
    ]

    for (let index = 0; index < tmp.length; index++) {
        for (let row = 0; row < tmp[index].total; row++) {
            // send a message to the client
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    io.emit("eventdata", { sheet: tmp[index].sheet, current: row + 1 })
                    resolve(1);
                }, 100);
            })
        }
    }
    io.emit("eventdata", { sheet: 'completed', current: 0 })

})
// server.listen(3000);
var server = app.listen(3000, () => console.log('Hello World Manual berjalan di http://localhost:3000'))

const io = require('socket.io')(server, {
    path: "/api/uploader",
    cors: {
        origin: '*',
    },
    transports: ['websocket'],
});

io.on('connection', (socket) => {
    socket.removeAllListeners();
    console.log('Websocket on connection', socket.id, socket.handshake.url);
});
