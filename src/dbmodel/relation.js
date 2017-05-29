const config = require('../model/config');
const sqlite3 = require('sqlite3')
const dbmodel = require("./dbmodel")

class relationModel extends dbmodel {
    constructor() {
        super()
    }
    async getObjectIdByTagId(tagid) {
        return new Promise((resolve, reject) => {
            this.model.all(`select objectid from relation where tagid=${tagid}`, (e, r) => {
                if (e) {
                    reject(e);
                } else {
                    const res=[]
                    for(let item of r){
                        res.push(item.objectid)
                    }
                    resolve(res);
                }
            });
        });
    }

    async create(tagId, objectId) {
        return new Promise((resolve, reject) => {
            this.model.run("insert or replace into relation (tagid,objectid) values (?,?)", [tagId, objectId], (e) => {
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
