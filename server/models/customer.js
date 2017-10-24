const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/commaterialize');
// mongoose.Promise = global.Promise;
var customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

var Customer = mongoose.model('Customer', customerSchema);

class Model {
  static readAll() {
    return new Promise((resolve, reject) => {
      Customer.find({}).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject) => {
      Customer.findOne({
        "_id": id
      }).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static create(insert) {
    const secret = process.env.SALT_KEY;
    insert.password = crypto.createHmac('sha256', secret).update(insert.password).digest('hex');
    return new Promise((resolve, reject) => {
      Customer.create({
        name: insert.name,
        email: insert.email,
        password: insert.password,
        role: insert.role
      }).then((data) => {
        var obj = {
          message: 'Insert Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static update(update){

  }
  static delete(id){
    
  }
  static register(insert) {
    const secret = process.env.SALT_KEY;
    insert.password = crypto.createHmac('sha256', secret).update(insert.password).digest('hex');
    return new Promise((resolve, reject) => {
      Customer.create({
        name: insert.name,
        email: insert.email,
        password: insert.password,
        role: 'user'
      }).then((data) => {
        var obj = {
          message: 'Insert Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static login(email, password) {
    return new Promise((resolve, reject) => {
      Customer.findOne({
        "email": email,
      }).then((data) => {
        const secret = process.env.SALT_KEY;
        const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
        if(hash === data.password){
          var token = jwt.sign({ _id:data._id, name: data.name, email:data.email, role:data.role }, process.env.JWT_KEY);
          resolve({token:token});
        } else {
          reject('gagal')
        }
      }).catch((err) => {
        reject('failed')
      })
    })
  }
}

module.exports = Model;
