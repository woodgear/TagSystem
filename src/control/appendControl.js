const append = require("../model/append");
const common = require("../../util/common");
const argv = process.argv;
const fs = require('fs')
const config = require("../model/config");
const Path = require('path');

class appendControl {
    constructor() {
        this.append = new append();
    }

    async tagDirectory(tag, directory) {
    }

    async tagObj(tags, obj) {
        if (obj.type == "file") {
            const storepath = config.getPath();
            if (!obj.object.startsWith(storepath)) {
                console.log(`please append file which in ${storepath} not ${obj.object}`);
                process.exit();
            }
            obj.object = obj.object.slice(storepath.length)
        }
        for (let tag of tags) {
            await this.append.append(obj, tag);
        }
        console.log(`append tag [${tags.join(" ")}] in  ${obj.type} "${obj.object}"`)
    }

}

async function main() {
    const control = new appendControl();
    params = process.argv.slice(2)

    const basePath = fs.realpathSync(params.shift());

    const obj = params.shift();
    const tags = params;

    let { isRealPath, res } = common.isRealPath(basePath, obj);
    if (isRealPath) {
        await control.tagObj(tags, { type: "file", object: res });
    } else {
        await control.tagObj(tags, { type: "content", object: res });
    }
    process.exit();
}

main()