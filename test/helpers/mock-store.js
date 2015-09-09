export default class MockStore {
  constructor(_store) {
    this._store = _store;
  }

  cleanRecords() {
    const resources = this._store.resources;

    Object.keys(resources).forEach(resource => {
      resources[resource].records = {};
    });
  }

  withOnePerson() {
    this._store.resources.people.records = {
      1: {
        name: "test person"
      }
    };
  }
}
