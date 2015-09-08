export default class Store {
  constructor(...models) {
    this.resources = {};

    models.forEach(model => {
      this.resources[model.resourceName] = {
        model,
        records: {}
      };
    });
  }
}
