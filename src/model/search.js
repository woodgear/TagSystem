const dbobj = require('../../util/dbobj');
const Path = require('path');
const config = require('../model/config');
function sortByRepetition(data) {
    //console.log("data=>", data);
    const bucket = {}
    for (item of data) {
        if (!bucket[item]) {
            bucket[item] = 0;
        }
        bucket[item] = bucket[item] + 1;
    }
    const res = Object.keys(bucket).sort(function (a, b) { return bucket[b] - bucket[a] })
    return res;
}

class Search {
    constructor() {
        this.tag = dbobj.get('tag');
        this.object = dbobj.get('object');
        this.relation = dbobj.get('relation');
    }

    //give a collection of tag return the object which related more
    async include(tags) {
        const tagIds = await this.tag.getIds(tags);
        //sort by repetition
        let data = []
        for (let tagid of tagIds) {
            const objectids = await this.relation.getObjectIdByTagId(tagid);
            data = Array.prototype.concat(data, objectids)
        }
        const objecids = sortByRepetition(data);
        const objects = await this.object.getObjects(objecids);
        const res = objects.sort((a, b) => { return a.createtime < b.createtime });
        const contents = [];
        res.map((obj) => {
            contents.push(Path.join(config.getPath(), obj.object));
        });
        return contents;
    }
}

module.exports = Search;