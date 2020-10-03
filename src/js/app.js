import Controller from './Controller';
import View from './View';
import Model from './Model';

const container = document.getElementById('root');
const view = new View(container);
const model = new Model();
const controller = new Controller(view, model);

controller.start();
