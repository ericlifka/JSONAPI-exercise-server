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
    if (req.body.data.type !== this.resourceName) {
      return res.status(409).json({ errors: [ `Unsupported resource type ${req.body.data.type} for this collection` ] });
    }

    const model = this.modelFromRequest(req);

    if (model.errors) {
      return res.status(403).json(model);
    }

    this.store.create(this.resourceName, model)
      .then(id =>
        res.json({
          data: {
            id,
            type: this.resourceName,
            attributes: model
          }
        }))
      .catch(error =>
        res.status(409).json({ errors: [ error ] }));
  }

  READ(req, res) {
    const resource_id = req.params.resource_id;

    this.store.find(this.resourceName, resource_id)
      .then(record => {
        res.json({
          data: {
            id: resource_id,
            type: this.resourceName,
            attributes: record
          }
        });
      })
      .catch(error => {
        res.status(404).json({ 'errors': [ error ] });
      });
  }

  READ_ALL(req, res) {
    this.store.findAll(this.resourceName)
      .then(records => {
        res.json({
          data: Object.keys(records).map(id => ({
            id,
            type: this.resourceName,
            attributes: records[ id ]
          }))
        });
      })
      .catch(error => {
        res.status(404).json({ 'errors': [ error ] })
      });
  }

  UPDATE(req, res) {
    res.json({ 'data': {} });
  }

  DELETE(req, res) {
    res.json({ 'data': {} });
  }

  modelFromRequest(req) {
    const model = {};
    const data = req.body.data;

    for (let i = 0; i < this.model.attributes.length; i++) {
      let attribute = this.model.attributes[ i ];

      let value = data[ attribute.name ];
      if (value) {
        model[ attribute.name ] = value;
      }
      else if (attribute.required) {
        return { errors: [ `Missing required attribute ${attribute.name} for ${this.resourceName} records` ] };
      }
    }

    return model;
  }
}
