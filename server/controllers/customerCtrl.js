const models = require('../models/customers');

class CustomerCtrl {

  static register(req, res){
    models.register(req, res)
  }

  static login(req, res){
    models.login(req, res)
  }

}
module.exports = CustomerCtrl;
