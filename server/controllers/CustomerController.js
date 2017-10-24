const Customer = require('../models/Customer');

class CustomerController {

  static fetchAll (req, res) {

    const execQuery = Customer.find({}).sort('name');

    execQuery
      .then((customers) => {

        res.status(200).json(customers || []);

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static fetchById (req, res) {

    const execQuery = Customer.findById(req.params.id);

    execQuery
      .then((customer) => {

        if (customer)
          res.status(200).json(customer);
        else
          res.status(404).json({});

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static create (req, res) {

    const newCustomer = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      address: req.body.password,
      zipcode: req.body.zipcode,
      phone: req.body.phone
    };

    const execQuery = Customer.insertMany(newCustomer);

    execQuery
      .then((customer) => {

        res.status(201).json(customer);

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static update (req, res) {

    const findQuery = Customer.findById(req.params.id);

    findQuery
      .then((customer) => {

        // If customer doesn't exist
        if (!customer) {

          res.status(404).json({});

        } else {

          const newCustomerInfo = {
            name: req.body.name,
            username: req.body.username,
            address: req.body.address,
            zipcode: req.body.zipcode,
            phone: req.body.phone
          };

          const updateQuery = Customer.where({ _id: customer.id }).update(newCustomerInfo);

          updateQuery
            .then((status) => {

              res.status(200).json({
                status: status,
                customer: newCustomerInfo
              });

            })
            .catch((err) => {

              res.status(400).json(err);

            });

        }

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static delete (req, res) {

    const findQuery = Customer.findById(req.params.id);

    findQuery
      .then((customer) => {

        // If customer doesn't exist
        if (!customer) {

          res.status(404).json({});

        } else {

          const deleteQuery = Customer.deleteOne({ _id: customer.id });

          deleteQuery
            .then((status) => {

              res.status(200).json({
                status: status,
                customer: customer
              });

            })
            .catch((err) => {

              res.status(400).json(err);

            });

        }

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

}

module.exports = CustomerController;
