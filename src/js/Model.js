export default class Model {
  constructor() {
    this.products = [];
  }

  /* eslint-disable */
  async getAll() {
    const tikets = await fetch('http://localhost:7090/?method=allTickets');
    return tikets.json();
  }

  async save(product) {
    await fetch('http://localhost:7090', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  }

  async delete(id) {
    await fetch(`http://localhost:7090?id=${id}`, {
      method: 'DELETE',
    });
  }

  async find(id) {
    const tikets = await fetch(`http://localhost:7090/?method=ticketById&id=${id}`);
    return tikets.json();
  }

  async update(product) {
    await fetch('http://localhost:7090', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  }

  async status(id) {
    await fetch('http://localhost:7090', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status: true }),
    });
  }

  async checkDescription(id) {
    await fetch('http://localhost:7090', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, descriptionStatus: true }),
    });
  }
}
