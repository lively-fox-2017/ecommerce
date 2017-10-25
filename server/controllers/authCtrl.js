const User = require('../models/user');
const decryptAES256CTR = require('../helpers/decryptAES256CTR');
const jwt = require('jsonwebtoken');
class AuthCtrl {
  static login(req, res, next) {
    User.findOne({
        username: req.body.username
      })
      .then((user) => {
        if (req.body.password === decryptAES256CTR(user.password)) {
          let token = jwt.sign({
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            role: user.role
          }, process.env.APPSECRET)
          res.status(200).json({
            token: token,
            role: user.role,
          });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
        console.error(err);
      })
  }

  static signup(req, res, next) {
    let newUser = new User(req.body);
    newUser.save()
      .then((value) => {
        res.status(200).json(value);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }
}

module.exports = AuthCtrl;
