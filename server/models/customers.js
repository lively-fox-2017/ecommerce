const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let custSchema = new Schema({
  name:{
    type: String
  },
  memberid:{
    type: String
  },
  address:{
    type: String
  },
  zipcode:{
    type: String
  },
  phone:{
    type: String
  }
})

let Customer = mongoose.model('Customer', custSchema);

class Customers {
  //get books
  static getCustomers(callback, limit) {
    Customer.find(callback).limit(limit);
  };

  //add customer
  static addCustomer(body, callback) {
    var customer = {
      "name": `${body.name}`,
      "memberid": `${body.memberid}`,
      "address": `${body.address}`,
      "zipcode": `${body.zipcode}`,
      "phone": body.phone
    }
    Customer.create(body, callback);
  };

  //update customer
  static updateCustomer(params, body, callback) {
    var id = {
      _id : params.id
    }
    var update = {
      "name": `${body.name}`,
      "memberid": `${body.memberid}`,
      "address": `${body.address}`,
      "zipcode": `${body.zipcode}`,
      "phone": body.phone
    }
    Customer.findByIdAndUpdate(id, update, callback);
  };
    //delete Customer
  static deleteCustomer(params, callback){
    var id = {
      _id : params.id
    }
    Customer.deleteOne(id, callback)
  }
}
module.exports = Customers;
