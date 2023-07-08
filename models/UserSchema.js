var mongoose = require('mongoose');
// var bcrypt = require("bcryptjs")

var user = new  mongoose.Schema({
    username:String,
    email:String,
    password:String,
    // article: [{type: mongoose.Schema.Types.ObjectId, ref: 'article'}]
})
// user.pre('save', function(next) {                                                                                                                                        
//     if(this.password) {                                                                                                                                                        
//         var salt = bcrypt.genSaltSync(10)                                                                                                                                     
//         this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
//     }                                                                                                                                                                          
//     next()                                                                                                                                                                     
// })  
module.exports = mongoose.model("user", user)