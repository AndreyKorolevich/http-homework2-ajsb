export default class View {
  constructor(container) {
    this.container = container;
    this.saveProduct = null;
    this.updateProduct = null;
    this.showForm = this.showForm.bind(this);
  }

  getMark(data) {
    if (document.querySelector('.products')) {
      document.querySelector('.products').remove();
    }
    const products = document.createElement('div');
    products.classList.add('products');
    products.innerHTML = `
      <header class="header">
        <div>Tikets</div>
        <button type="button" id="new-product">Add tikets</button>
       </header>
      <section>
        ${this.table(data).outerHTML} 
      </section>`;

    this.container.appendChild(products);
  }

  showForm(elem = { name: '', description: '', id: 999 }) {
    const { name, description, id } = elem;

    const formContainer = document.createElement('div');
    formContainer.classList.add('container-form');
    formContainer.innerHTML = `
   <form id="form" data-id="${id}">
      <div class="name">
        <label for="name">Name</label>
        <input id="name" class="input" type="text" value="${name}" placeholder="Text name"> 
      </div>
      <div class="description">
        <label for="description">Description</label>
        <textarea id="description" class="input" type="text" placeholder="Text Description">${description}</textarea>
      </div>
      <div class="buttons-firm">
        <button id="button-save" type="submit">Save</button>
        <button id="button-reset" type="reset">Cancel</button>
      </div>
    </form>`;

    this.container.querySelector('.products').appendChild(formContainer);
    document.getElementById('form').addEventListener('submit', (event) => {
      if (elem.id === 999) {
        this.saveProduct(event);
      } else {
        this.updateProduct(event);
      }
    });
    document.getElementById('form').addEventListener('reset', () => {
      this.container.querySelector('.container-form').remove();
    });
  }
  /* eslint-disable */
  addListener(callbackNewProducts, callbackDeleteProducts) {
    const button = document.getElementById('new-product');
    button.addEventListener('click', () => {
      callbackNewProducts();
    });

    document.querySelector('tbody').addEventListener('click', (event) => {
      callbackDeleteProducts(event);
    });
  }

  getProduct(data) {
    this.tbody = document.createElement('tbody');
    data.forEach((elem) => {
      const tr = document.createElement('tr');
      tr.id = elem.id;
      tr.dataset.status = elem.status;
      tr.dataset.description = elem.descriptionStatus;
      const thChech = document.createElement('th');
      const thName = document.createElement('th');
      const thDate = document.createElement('th');
      const thActions = document.createElement('th');

      thActions.classList.add('th-actions');
      thChech.classList.add('action-check');

      thName.textContent = elem.name;
      thDate.textContent = elem.created;
      if(elem.status){
        thChech.innerHTML = '&#128505';
      }else{
        thChech.innerHTML = '&#65794';
      }

      thActions.innerHTML = `
        <div  class="action-update">✎</div>
        <div  class="action-delete">X</div>
        `;
      tr.append(thChech, thName, thDate, thActions);
      this.tbody.appendChild(tr);

      if(elem.descriptionStatus){
        const trDescription = document.createElement('tr');
        const thDescription = document.createElement('th');
        thDescription.textContent = elem.description;
        thDescription.classList.add('th-description');
        thDescription.colSpan = '4';
        trDescription.append(thDescription);
        this.tbody.appendChild(trDescription);
      }

    });
    return this.tbody;
  }

  table(products) {
    const table = document.createElement('table');
    table.classList.add('table');
    table.innerHTML = `
    <thead>
        <tr>
            <th class="table-head">Checked</th>
            <th class="table-head">Name</th>
            <th class="table-head">Date</th>
            <th class="table-head">Actions</th>
        </tr>
    </thead>
    ${this.getProduct(products).outerHTML}
    `;
    return table;
  }

}
