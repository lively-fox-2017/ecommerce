const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let custSchema = new Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

custSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

let Customer = mongoose.model('Customer', custSchema);

class CustomerModel {

  static register(req, res){
    var newCust = new Customer(req.body)
    var salt = bcrypt.genSaltSync(8)
    newCust.password = bcrypt.hashSync(req.body.password, salt)
    newCust.save().then((dataCust) => {
      res.status(200).json({ message: 'Register Success!', dataCust })
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static login(req, res){
    Customer.findOne({
      username: req.body.username
    })
    .then((dataCust)=>{
      console.log(dataCust);
      if(!dataCust){
        res.send('Unregistered, Please Register First!')
      } else if (dataCust.comparePassword(req.body.password)) {
        let token = jwt.sign({ dataCust }, 'kode rahasia')
        res.json({
          message:"Login Succes!",
          token: token
        })
      }else if (!dataCust.comparePassword(req.body.password)) {
        res.send('Authentication failed, Wrong Password!')
      }
    })
    .catch(err=>{
      res.send(err)
    })
  }

}
module.exports = CustomerModel;
