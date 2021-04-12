const ProductRepository = require('../../src/domain/Product/productRepository');

let products = [];

module.exports = class extends ProductRepository {
  constructor() {
    super();
  }

  async create(title, description, price) {
    const data = { title, description, price };
    products.push(data);

    return data;
  }

  findByTitle(title) {
    const product = products.find(product => product.title === title)
    return product
  }

  getproducts() {
    return products
  }

  getProduct(id) {
    const product = products.find(product => product.title === id)
    return product
  }

  remove(id) {
    products = products.splice(products.indexOf(products[id]), 1)
  }

  edit(id, data) {
    const { title, description, price} = data
    const product = products.find(product => product.title === id)
    const index = products.indexOf(product)

    products[index].title = title ? title : product.title
    products[index].description = description ? description : product.description
    products[index].price = price ? price : product.price
  }
};
