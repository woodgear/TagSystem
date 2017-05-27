const tag = require('../src/dbmodel/tag');
const object = require('../src/dbmodel/object');
const relation = require('../src/dbmodel/relation');

const models = {
    "tag": tag,
    "object": object,
    "relation": relation,
}
class dbobj {
    static get(model) {
        const m = models[model];
        return new m();
    }
}

module.exports = dbobj;