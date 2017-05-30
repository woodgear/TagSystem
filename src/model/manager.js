const sqlite3 = require('sqlite3')
const log = require('../../util/log');
const fs = require('fs');
const spawn = require("child_process").spawn;
const config = require('./config')
const intitSqlPath = `${__dirname}/../../util/init.sql`;
const dbname = 'tagsys.db'
const shell = require('shelljs')
const remove = require('remove');

class Manager {
    constructor() {

    }
    async init(path) {
        //create .tagsys init .tagsys/tagsys.db 
        path=fs.realpathSync(path);
        const folderpath = `${path}/.tagsys`;
        const dbpath = `${folderpath}/${dbname}`
        if (!fs.existsSync(folderpath)) {
            fs.mkdirSync(folderpath);
            const db = spawn("sqlite3", [dbpath])
            shell.exec(`sqlite3 ${dbpath} <${intitSqlPath}`)
        }
        config.setPath(path);
    }
    async removeTag(obj, tag) {

    }
    //remove config.js
    //remove .tagsys in target path
    async clear() {
        const path=`${config.getPath()}/.tagsys`;
        if (fs.existsSync(path)) {
            remove.removeSync(path);
        }
        config.setPath("");
    }
}

module.exports = Manager;