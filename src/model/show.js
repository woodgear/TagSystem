const dbobj = require('../../util/dbobj')

class show {
    constructor() {
        this.tag = dbobj.get('tag');
        this.object = dbobj.get('object');
        this.relation = dbobj.get('relation');

    }
    async showAllTag() {
        return this.tag.getAllTag();
    }
    async showTagByObject(obj) {
        const objid = await this.object._getId(obj);
        const tagids = await this.relation.getTagIdsByObjectId(objid);
        const tags = await this.tag.getTagNamesByIds(tagids);
        return tags;
    }
}

module.exports = show;