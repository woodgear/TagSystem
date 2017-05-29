const config = require('../model/config');
const dbmodel = require('./dbmodel')
const sqlite3 = require('sqlite3')
const fs = require('fs')
class tagModel extends dbmodel {
    constructor() {
        super()
    }
    async findOrCreate(tag) {
        const hasTag = await this.has(tag);
        if (!hasTag) {
            await this.create(tag);
        }
        return this._getId(tag);
    }
    async has(tag) {
        return new Promise((resolve, reject) => {
            this.model.get("select count(*) as count from tag where name=?", tag, (e, r) => {
                if (e) {
                    reject(e);
                }
                resolve(r.count > 0);
            });
        });
    }
    async create(tag) {
        return new Promise((resolve, reject) => {
            this.model.run("insert into tag (name) values (?)", tag, (e) => {
                if (e) {
                    reject(e);
                }
                resolve();
            });
        });
    }
    //[id*]
    async getIds(tags) {
        const ids = [];
        for (let tag of tags) {
            try {
                const id = await this._getId(tag);
                ids.push(id);
            } catch (e) {
            }
        }
        return ids;
    }

    //->option(id:string,null)
    async _getId(tag) {
        return new Promise((resolve, reject) => {
            this.model.get("select id from tag where name=?", [tag], (e, r) => {
                if (e) {
                    reject(e);
                }
                if (r === undefined) {
                    reject(`could tag found the id of ${tag}`);
                } else {
                    resolve(r.id);
                }
            });
        });
    }
    async getTagNamesByIds(tagids) {
        const queryids = tagids.join(',');
        return new Promise((resolve, reject) => {
            this.model.all(`select name from tag where id in (${queryids})`, (e, r) => {
                if (e) {
                    reject(e);
                }
                const tags = []
                for (let tag of r) {
                    tags.push(tag.name)
                }
                resolve(tags);
            });
        });

    }
    async getAllTag() {
        return new Promise((resolve, reject) => {
            this.model.all("select name from tag ", (e, r) => {
                if (e) {
                    reject(e);
                }
                const tags = []
                for (let tag of r) {
                    tags.push(tag.name)
                }
                resolve(tags);
            });
        });
    }
}
module.exports = tagModel;