export default class Model {
  constructor() {
    this.products = [];
  }

  /* eslint-disable */
  async getAll() {
    const tikets = await fetch('https://http-homework-backend.herokuapp.com/?method=allTickets');
    return tikets.json();
  }

  async save(product) {
    await fetch('https://http-homework-backend.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  }

  async delete(id) {
    await fetch(`https://http-homework-backend.herokuapp.com/?id=${id}`, {
      method: 'DELETE',
    });
  }

  async find(id) {
    const tikets = await fetch(`https://http-homework-backend.herokuapp.com/?method=ticketById&id=${id}`);
    return tikets.json();
  }

  async update(product) {
    await fetch('https://http-homework-backend.herokuapp.com/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  }

  async status(id) {
    await fetch('https://http-homework-backend.herokuapp.com/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status: true }),
    });
  }

  async checkDescription(id) {
    await fetch('https://http-homework-backend.herokuapp.com/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, descriptionStatus: true }),
    });
  }
}
