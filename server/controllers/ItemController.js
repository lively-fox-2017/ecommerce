const Item = require('../models/Item');

class ItemController {

  static fetchAll (req, res) {

    const execQuery = Item.find({}).sort('name');

    execQuery
      .then((items) => {

        res.status(200).json(items || []);

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static fetchById (req, res) {

    const execQuery = Item.findById(req.params.id);

    execQuery
      .then((item) => {

        if (item)
          res.status(200).json(item);
        else
          res.status(404).json({});

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static create (req, res) {

    const newItem = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      imageURL: req.body.imageURL,
      price: req.body.price
    };

    const execQuery = Item.insertMany(newItem);

    execQuery
      .then((item) => {

        res.status(201).json(item);

      })
      .catch((err) => {

        res.status(400).json(err);

      });

  }

  static update (req, res) {

    const findQuery = Item.findById(req.params.id);

    findQuery
      .then((item) => {

        // If item doesn't exist
        if (!item) {

          res.status(404).json({});

        } else {

          const newItemInfo = {

            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            imageURL: req.body.imageURL,
            price: req.body.price,

          };

          const updateQuery = Item.update({ _id: item.id }, newItemInfo, { runValidators: true });

          updateQuery
            .then((status) => {

              res.status(200).json({
                status: status,
                item: newItemInfo
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

    const findQuery = Item.findById(req.params.id);

    findQuery
      .then((item) => {

        // If item doesn't exist
        if (!item) {

          res.status(404).json({});

        } else {

          const deleteQuery = Item.deleteOne({ _id: item.id });

          deleteQuery
            .then((status) => {

              res.status(200).json({
                status: status,
                item: item
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

module.exports = ItemController;
