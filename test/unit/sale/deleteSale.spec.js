const { create, list, remove } = require('../../../src/application/useCases/Sale');
const { BadRequestError } = require('../../../src/interfaces/http/http-errors');
const fakelocator = require('../../fakes/fakelocator')
const createProd = require('../../../src/application/useCases/products/createProduct');
const createSeller = require('../../../src/application/useCases/seller/newSeller');

function request(productId, sellerId, clientName, qnt) {
  return {
    productId,
    sellerId,
    clientName,
    qnt
  };
};

describe('Sale | Delete', () => {
  beforeAll(async () => {

  const requestData = request('CARRO', 'AAA', 'joao')

  await createProd.execute({ title: 'Carro', description: 'nova', price: 20, stock: 3 }, fakelocator);
  await createProd.execute({ title: 'Carro2', description: 'nova', price: 20, stock: 3}, fakelocator);
  await createSeller.execute({ name: 'joao', image: 'joao.jpg', code: 'AAA' }, fakelocator)
  await createSeller.execute({ name: 'Maria', image: 'maria.jpg', code: 'BBB' }, fakelocator)

  await create.execute(requestData, fakelocator);
  await create.execute(requestData, fakelocator);
  })
  it('Should to remove a sale', async () => {
    await remove.execute(1, fakelocator)

    const sales = await list.execute(null, fakelocator);

    expect(sales).toEqual([request('CARRO', 'AAA', 'joao', 1)]);
    expect(sales.length).toEqual(1);
  });
  it('Should to return custom error if sale id is invalid', async () => {

    await expect(remove.execute(200, fakelocator)).rejects.toEqual(new BadRequestError('Invalid sale id'));
  });
})
