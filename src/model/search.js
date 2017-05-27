const dbobj = require('../../util/dbobj')
class Search {
    constructor() {
        this.tag = dbobj.get('tag');
        this.object = dbobj.get('object');
        this.relation = dbobj.get('relation');
    }
    async include(tags) {
        const tagIds = await this.tag.getIds(tags);
        const objectIds = await this.relation.getObjectByTagIds(tagIds);
        const objects = await this.object.getObjects(objectIds);
        return objects;
}
}

module.exports = Search;