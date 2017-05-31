const move = require("../model/move");
const common = require("../../util/common");
const argv = process.argv;
const fs = require('fs')
const config = require("../model/config");
const Path = require('path');

class MoveControl {
    constructor() {
        this.model = new move();
    }
    async mv(from, to) {
        const frompath = from.slice(config.getPath().length);
        const topath = to.slice(config.getPath().length);
        fs.renameSync(from, to);
        await this.model.move(frompath, topath);
    }
}
async function main() {
    const control = new MoveControl();
    params = process.argv.slice(2)
    if (params.length != 3) {
        console.log("you must have from and to ");
        process.exit();
    }

    const basePath = fs.realpathSync(params.shift());

    let from = common.isRealPath(basePath, params[0]);
    let toPath = params[1];
    if ((toPath.startsWith("./") || toPath.startsWith("../")) || (!((toPath.startsWith("/") || toPath.startsWith("~/"))))) {
        toPath = Path.join(basePath, toPath);
    }
    if (!toPath.startsWith(config.getPath())) {
        console.log(`not ${toPath} you could only use tmv in  ${config.getPath()}`);
        process.exit();
    }

    if (from.isRealPath) {
        await control.mv(from.res, toPath);
    } else {
        console.log("you path wrong", from.res);
        process.exit();
    }

    process.exit();
}

main()