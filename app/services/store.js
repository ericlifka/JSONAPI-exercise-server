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

  find(resourceType, resourceId) {
    return new Promise((resolve, reject) => {
      resolve({});
    })
  }
}
