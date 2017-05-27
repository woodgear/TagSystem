const fs = require('fs')
class common {
    static isInvaildDirectoryPath(str) {
        if (!fs.existsSync(str)) {
            return { status: false, reason: "this path does not exists" }
        }
        if (!fs.lstatSync(str).isDirectory) {
            return { status: false, reason: "this path is not a directory" }
        }
        return { status: true }
    }
}
module.exports = common;