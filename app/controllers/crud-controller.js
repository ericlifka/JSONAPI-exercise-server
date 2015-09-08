export default class CRUDController {
  constructor(model) {
    if (!model || !model.resourceName) {
      throw "Model passed to CRUDController must have a valid resource name";
    }

    this.model = model;
    this.resourceName = model.resourceName;
  }

  addRoutes(server) {
    server.post(`/${this.resourceName}`, this.CREATE.bind(this));
    server.get(`/${this.resourceName}`, this.READ_ALL.bind(this));
    server.get(`/${this.resourceName}/:resource_id`, this.READ.bind(this));
    server.put(`/${this.resourceName}/:resource_id`, this.UPDATE.bind(this));
    server.delete(`/${this.resourceName}/:resource_id`, this.DELETE.bind(this));
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
