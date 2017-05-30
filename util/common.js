const fs = require('fs')
const path = require('path')
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
    static isRealPath(basePath, params) {
        let isRealPath = false;
        let res = params;
        let reason = "";
        if (params.startsWith("./") || params.startsWith("./")) {
            isRealPath = fs.existsSync(path.join(basePath, params));
            if (isRealPath) {
                res = path.join(basePath, params);
            }
        } else if (params.startsWith("/") || params.startsWith("~")) {
            isRealPath = fs.existsSync(params);
            if (isRealPath) {
                res = params;
            }
        }
        else {
            isRealPath = fs.existsSync(path.join(basePath, params));
            if (isRealPath) {
                res = path.join(basePath, params)
            }
        }
        return { isRealPath, res };
    }
}
module.exports = common;