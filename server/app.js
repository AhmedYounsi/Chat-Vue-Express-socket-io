
const express = require('express');
const app = express();

//db connection
const connectDB = require('./connection/db')
connectDB()

//model mongoose
const Message = require("./model/model");


const PORT = process.env.PORT || 3000

const server = app.listen(PORT, function () {
    console.log('server running on port 3000');
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {

    socket.on('GET_MESSAGE', function () {
        Message.find().then((message) => {
            io.emit('MESSAGE', message)
        });
    });


    socket.on('SEND_MESSAGE', function (data) {
        const message = new Message({
            message: data.message
        });

        message.save(message)



    });
});

// handle prod
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + '/public/'))

	app.get(/.*/,(req,res)=>{
		res.sendFile(__dirname + '/public/index.html')
	})
}