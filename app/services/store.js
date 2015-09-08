export default class Store {
  constructor(...models) {
    this.models = {};

    models.forEach(model => {
      this.models[model.resourceName] = model;
    });
  }
}
