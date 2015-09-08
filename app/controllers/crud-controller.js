import express from 'express';

export default class CRUDController {
  constructor(model, store) {
    if (!store) {
      throw "Store must be provided to CRUDController";
    }
    if (!model || !model.resourceName) {
      throw "Model passed to CRUDController must have a valid resource name";
    }

    this.store = store;
    this.model = model;
    this.resourceName = model.resourceName;
  }

  getRouter() {
    const router = express.Router();

    router.route(`/${this.resourceName}`)
      .post(this.CREATE.bind(this))
      .get(this.READ_ALL.bind(this));

    router.route(`/${this.resourceName}/:resource_id`)
      .get(this.READ.bind(this))
      .put(this.UPDATE.bind(this))
      .delete(this.DELETE.bind(this));

    return router;
  }

  CREATE(req, res) {
    res.json({'data': {}});
  }

  READ(req, res) {
    const resource_id = req.params.resource_id;

    this.store.find(this.resourceName, resource_id).then(record => {
      res.json({'data': record});
    });
  }

  READ_ALL(req, res) {
    res.json({'data': []});
  }

  UPDATE(req, res) {
    res.json({'data': {}});
  }

  DELETE(req, res) {
    res.json({'data': {}});
  }
}
