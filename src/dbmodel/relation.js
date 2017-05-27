const config = require('../model/config');
const sqlite3 = require('sqlite3')
const dbmodel = require("./dbmodel")

class relationModel extends dbmodel {
    constructor() {
        super()
    }
    async getObjectByTagIds(tagids) {
        const ids = [];
        for (let tag of tagids) {
            ids.push(tag.id)
        }
        const inids = ids.join(',')

        return new Promise((resolve, reject) => {
            this.model.all(`select distinct objectid from  relation where tagid in (${inids})`, (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r);
            });
        });
    }

    async create(tagId, objectId) {
        return new Promise((resolve, reject) => {
            this.model.run("insert into relation (tagid,objectid) values (?,?)", [tagId, objectId], (e) => {
                if (e) {
                    reject(e);
                }
                resolve();
            });
        });
    }
    async getTagIdsByObjectId(objid) {
        return new Promise((resolve, reject) => {
            this.model.all('select tagid  from  relation where objectid =?', objid, (e, r) => {
                if (e) {
                    reject(e);
                }
                const tagids = []
                for (let tag of r) {
                    tagids.push(tag.tagid);
                }
                resolve(tagids);
            });
        });

    }
}
module.exports = relationModel;
