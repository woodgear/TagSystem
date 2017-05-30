const config = require('../model/config');
const sqlite3 = require('sqlite3')
const dbmodel = require("./dbmodel")
//啧 手动orm吗?
class objectModel extends dbmodel {
    constructor() {
        super()
    }
    async getObjects(objectIds) {
        const objects = [];
        for (let id of objectIds) {
            const data = await this._getObject(id);
            objects.push(data);
        }
        return objects;
    }
    async _getObject(id) {
        return new Promise((resolve, reject) => {
            this.model.get("select object,createtime from object where id=?", id, (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r);
            });
        });
    }
    async has(obj) {
        return new Promise((resolve, reject) => {
            this.model.get("select count(*) as count from object where object=?", obj, (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r.count > 0);
            });
        });
    }

    async findOrCreate(obj) {
        const hasObj = await this.has(obj);
        if (!hasObj) {
            await this.create(obj);
        }
        return this._getId(obj);
    }
    async create(obj) {
        await new Promise((resolve, reject) => {
            this.model.run("insert into object (object) values (?)", obj, (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve();
            });
        });

    }

    async _getId(object) {
        return new Promise((resolve, reject) => {
            this.model.get("select id from object where object=?", object, (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r.id);
            });
        });

    }
    async updateObj(orginObj, newObj) {
        return new Promise((resolve, reject) => {
            this.model.get("update object set object=? where object=?", [orginObj, newObj], (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r.id);
            });
        });
    }
}
module.exports = objectModel;
