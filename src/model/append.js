const dbobj = require('../../util/dbobj')
class Append {
    constructor() {
        this.tag = dbobj.get('tag');
        this.object = dbobj.get('object');
        this.relation = dbobj.get('relation');
    }
    async append(obj, tag) {
        const tagId = await this.tag.findOrCreate(tag);
        const objectId = await this.object.findOrCreate(obj);
        await this.relation.create(tagId, objectId);
    }
}

module.exports = Append;