import uuid from 'uuid';

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
        reject("No record found for given id and resource type");
      }
    })
  }

  findAll(resourceType) {
    return new Promise((resolve, reject) => {
      const resource = this.resources[ resourceType ];
      if (!resource) {
        reject("Not a valid resource type");
      } else {
        resolve(resource.records);
      }
    });
  }

  create(resourceType, model, id = uuid.v4()) {
    return new Promise((resolve, reject) => {
      const resource = this.resources[ resourceType ];

      if (!resource) {
        reject("Not a valid resource type");
      }
      else if (resource.records[ id ]) {
        reject("A record already exists with that ID");
      }
      else {
        resource.records[ id ] = model;

        resolve(id);
      }
    });
  }
}
