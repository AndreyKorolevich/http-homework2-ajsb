export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.saveProduct = this.saveProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.action = this.action.bind(this);
  }

  start() {
    this.model.getAll()
      .then((data) => {
        this.view.getMark(data);
        this.view.addListener(this.view.showForm, this.action);
        this.view.saveProduct = this.saveProduct;
        this.view.updateProduct = this.updateProduct;
      });
  }

  saveProduct(event) {
    event.preventDefault();
    const { name, description } = event.target;
    this.model.save({
      name: name.value,
      description: description.value,
    });
    this.start();
  }

  action(event) {
    if (event.target.classList.contains('action-delete')) {
      const { id } = event.target.closest('tr');
      this.model.delete(id)
        .then(() => {
          this.start();
        });
    } else if (event.target.classList.contains('action-update')) {
      const { id } = event.target.closest('tr');
      this.model.find(id)
        .then((data) => {
          this.view.showForm(data);
        });
    } else if (event.target.classList.contains('action-check')) {
      const { id } = event.target.closest('tr');
      this.model.status(id)
        .then(() => {
          this.start();
        });
    } else {
      const { id } = event.target.closest('tr');
      this.model.checkDescription(id);
      this.start();
    }
  }

  updateProduct(event) {
    event.preventDefault();
    const { name, description, dataset } = event.target;
    this.model.update({
      name: name.value,
      description: description.value,
      id: dataset.id,
    });
    this.start();
  }
}
