const sqlite3 = require('sqlite3')
const config = require("../model/config")
class dbmodel {
    constructor() {
        this.model = new sqlite3.Database(`${config.getPath()}/tagsys.db`);
    }
}
module.exports = dbmodel;
