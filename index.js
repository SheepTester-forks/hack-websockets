import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer()

const io = new Server(httpServer, {
    // cors = Cross Origin Resource Sharing
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})


io.on('connection', socket => {

    // Upon connection - only to user 
    socket.emit('message', "Welcome to ACM's Chatroom")

    // Upon connection - to all others 
    socket.broadcast.emit('message', `User ${socket.id.substring(0, 5)} connected`)

//-------- Activity 1 --------
    //When a message event is activated, the message should be broadcasted to all connected users
    socket.on('message', data => {
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })
//----------------------------

//-------- Activity 3 --------
    // When user disconnects - to all others 
    socket.on('disconnect', () => {
        // Hint: Refer to how we emit the connection message
    })

    // Listen for activity event
    socket.on('activity', (name) => {
        // Hint: Pay attention to the parameter
    })
//----------------------------
})

httpServer.listen(3500, () => console.log('listening on port 3500'))