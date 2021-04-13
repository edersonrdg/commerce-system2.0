const { validate } = require('../../infra/validators/joi/product-validator');

module.exports = class {
  constructor(data) {
    validate(data);

    this.title = data.title;
    this.description = data.description;
    this.price = data.price;
    this.stock = data.stock || 0;
  }
};
