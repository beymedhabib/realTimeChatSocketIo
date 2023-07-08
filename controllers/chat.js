var express = require("express");
var Chat = require("./../models/chatSchema")
var router = express.Router();

// var jwt = require('jsonwebtoken');
// var bcrypt = require("bcryptjs")
// register
// Handle socket connections
router.post('/message/:user1/:user2',async(req,res)=>{
    console.log('test');
    const {user1,user2} = req.params
    const users = [user1, user2];
    const { message } = req.body;
    const date = new Date(); // Get the current date and time

    const existingChat = await Chat.findOne({
        users: { $all: users },
      });

      if (existingChat) {
        // Chat exists between user1 and user2, add new message
        existingChat.messages.push({
          message,
          user: user1,
          date: new Date(),
        });
  
        const savedChat = await existingChat.save();
  
        const io = req.app.get('io');
        io.emit('message', savedChat.messages);
  
        res.send(savedChat);
      } else {
        // Chat does not exist, create new chat with the users and message
        const newChat = new Chat({
          users: [user1, user2],
          messages: [
            {
              message,
              user: user1,
              date: new Date(),
            },
          ],
        });
  
        const savedChat = await newChat.save();
  
        const io = req.app.get('io');
        io.emit('message', savedChat.messages);
  
        res.send(savedChat);
      }
  


    // let newMessage = new chat({
    //     messages: [
    //         {
    //           message,
    //           user: user1,
    //           date,
    //         },
    //       ],
    //     users: users
    // })
    // let savedMessage =  await newMessage.save();
    // if(savedMessage) {
        
    //     const io = req.app.get('io');
    //   io.emit('message', savedMessage)
    //   res.send(savedMessage)
    // }
  })
// io.on('connection', (socket) => {
//     console.log('A user connected.');
  
//     // Handle disconnections
//     socket.on('disconnect', () => {
//       console.log('A user disconnected.');
//     });
  
//     // Handle chat messages
//     socket.on('chatMessage', (data) => {
//       // Store the message in MongoDB
//       const m = new chat({
//         user1: data.sender,
//         user2: data.receiver,
//         message: data.message,
//       });
  
//       m.save((error, savedChat) => {
//         if (error) {
//           console.error('Error saving chat:', error);
//         } else {
//           // Emit the chat message to the sender and receiver
//           io.to(data.sender).emit('chatMessage', savedChat);
//           io.to(data.receiver).emit('chatMessage', savedChat);
//         }
//       });
//     });
//   });
  

module.exports = router;