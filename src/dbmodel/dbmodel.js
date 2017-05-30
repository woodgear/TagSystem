const sqlite3 = require('sqlite3')
const config = require("../model/config")
class dbmodel {
    constructor() {
        // console.log("open database",config.getPath());
        this.model = new sqlite3.Database(`${config.getPath()}/.tagsys/tagsys.db`);
    }
}
module.exports = dbmodel;
