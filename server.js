const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var messages = [
    {name:'Tim', message:'Hi'},
    {name:'Jane', message:'Hello'}
]

app.get('/messages', (req, res) =>{
    res.send(messages);
})

app.post('/messages', (req, res) =>{
    // console.log(req.body);
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
})

io.on('connection', (socket) =>{
    console.log('an user connected!')
})

var server = http.listen(5000, () => {
    console.log('listening on ', server.address().port)
});

// app.listen(5000, () => {
//     console.log('listening on 5000')
// });