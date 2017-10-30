const user = require('../models/user')
const genSalt=require('../helper/saltGen');
const createHash=require('../helper/hash');

class Signup {
  constructor() {

  }
  static create(req,res){
    let salt=genSalt();
    user.create({
      username:`${req.body.username}`,
      password:`${createHash(req.body.password,process.env.APPSECRET+salt)}`,
      email:`${req.body.email}`,
      imageUrl:`${req.body.imageUrl}`,
      // role:`${req.body.role}`,
      role:`customer`,
      salt:`${salt}`,

    })
    .then((rows)=>{
      res.json({"message":"Signup sukses",
      "data":rows});
    })
    .catch(err=>{
      res.send(err);
    })
  }
}

module.exports = Signup
