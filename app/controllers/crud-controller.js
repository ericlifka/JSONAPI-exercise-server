import express from 'express';

export default class CRUDController {
  constructor(model) {
    if (!model || !model.resourceName) {
      throw "Model passed to CRUDController must have a valid resource name";
    }

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
    res.send(200);
  }

  READ(req, res) {
    res.send(200);
  }

  READ_ALL(req, res) {
    res.send(200);
  }

  UPDATE(req, res) {
    res.send(200);
  }

  DELETE(req, res) {
    res.send(200);
  }
}
