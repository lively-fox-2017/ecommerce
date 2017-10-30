const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username  : { type:String },
    password  : { type:String },
    salt      : { type:String },
    email     : { type:String },
    imageUrl  : { type:String },
    role      : { type:String },
    // cretedAt  : Date.now,
    // cretedAt  : Date.now
});

// UserSchema.pre('save', {
//   var user = this;
//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();
//   let salt=genSalt();
//   console.log('salt',salt);
//   console.log('app sec',process.env.APPSECRET);
//   this.salt=salt;
//   console.log('passssssssssss',this.password);
//   // console.log('hass pass',createHash(UserSchema.password,process.env.APPSECRET+salt));
//   UserSchema.password=createHash(UserSchema.password,process.env.APPSECRET+salt);
//   console.log(UserSchema.password);
//   return next();
// });

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//   password=createHash(candidatePassword,this.salt);
//   console.log(password,this.password);
//   if (password==this.password) {
//     cb(true)
//   } else {
//     cb(false)
//   }
// };
module.exports = mongoose.model('Users', UserSchema);
