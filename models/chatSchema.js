var mongoose = require('mongoose');
// var bcrypt = require("bcryptjs")

var chat = new  mongoose.Schema({
    messages: [
        {
          message: String,
          user: String,
          date: { type: Date, default: Date.now },
        },
      ],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    // user2: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    timestamp: { type: Date, default: Date.now },
    // username:String,
    // email:String,
    // password:String,
    // article: [{type: mongoose.Schema.Types.ObjectId, ref: 'article'}]
})
// user.pre('save', function(next) {                                                                                                                                        
//     if(this.password) {                                                                                                                                                        
//         var salt = bcrypt.genSaltSync(10)                                                                                                                                     
//         this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
//     }                                                                                                                                                                          
//     next()                                                                                                                                                                     
// })  
module.exports = mongoose.model("chat", chat)