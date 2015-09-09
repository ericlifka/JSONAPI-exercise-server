export default class Store {
  constructor(...models) {
    this.resources = {};

    models.forEach(model => {
      this.resources[ model.resourceName ] = {
        model,
        records: {}
      };
    });
  }

  find(resourceType, resourceId) {
    return new Promise((resolve, reject) => {
      const resource = this.resources[ resourceType ];
      const record = resource && resource.records[ resourceId ];

      if (record) {
        resolve(record);
      } else {
        reject("No record found for given id");
      }
    })
  }
}
