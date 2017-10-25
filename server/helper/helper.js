const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode');
// const moment = require('moment');

module.exports = {
  // mongoDB role authenticate
  mongoAuth: {
    auth: {
      authdb: 'admin'
    }
  },

  dataProduct: (reqBody) => {
    let Obj = {
      name: reqBody.name,
      url: reqBody.url,
      price: reqBody.price,
      stock: reqBody.stock,
      info: reqBody.info
    }

    return Obj
  },

  dataUser: (reqBody, password) => {
    let Obj = {
      username: reqBody.username,
      password: password,
      role: "user",
      email: reqBody.email,
      phone: reqBody.phone
    }

    return Obj
  },

  dataTransaction: (reqBody) => {
    let Obj = {
      user: reqBody.member,
      product: reqBody.days,
      checkout_date: new Date(),
      totalprice: reqBody.booklist
    }

    Obj.due_date = moment(new Date(Obj.out_date)).add(Obj.days, 'days')

    return Obj
  },

  secretGenerate: () => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let secret = ""
    for (let i = 0; i < 6; i++) {
      secret += str[Math.floor(Math.random()*62)]
    }

    return secret;
  },

  secretHash: (key, password) => {
    const hash = crypto.createHmac('md5', key).update(password).digest('hex');

    return hash;
  },

  authentication: (input) => {
    let token = jwt.sign({
      id: input._id,
      username: input.username,
      role: input.role
    }, 'hacktiv8');

    return token
  }

  // countFine: (in_date, due_date) => {
  //   let fine = 0
  //   let indateNum = moment(in_date).format('YYYYMMD')
  //   let duedateNum = moment(due_date).format('YYYYMMD')
  //   let hariDenda = indateNum - duedateNum
  //
  //   if (hariDenda > 0) {
  //     fine = hariDenda * 1000
  //   }
  //
  //   return fine
  // }
}
