const append = require("../model/append");
const common = require("../../util/common");
const argv = process.argv;
const fs = require('fs')
const isValid = require('is-valid-path');
const config = require("../model/config");
const Path = require('path');

class appendControl {
    constructor() {
        this.append = new append();
    }

    async tagDirectory(tag, directory) {
    }

    async tagFile(tags, path) {
        const storepath = config.getPath();
        console.log("path",path)
        path=path.slice(storepath.length);
        console.log("p",path)
        for(let tag of tags){
            await this.append.append(path, tag);
        }
        console.log(`append tag [${tags.join(" ")}] in "${path}"`)
    }

    async tagContent(tag, obj) {

    }

}

async function main() {
    const control = new appendControl();
    params = process.argv.slice(2)

    const basePath = fs.realpathSync(params.shift());
    if (!basePath.startsWith(config.getPath())) {
        console.log(`invalid path "${basePath}" you can use append while in "${config.getPath()}"`)
        process.exit()
    }

    if (params.length < 2) {
        console.log("to low params at list 2 ,tag and obj")
        process.exit()
    }

    const obj = params.pop();
    const tags = params;
    if (isValid(obj)) {
        const p = Path.join(basePath, obj);
        if (p.startsWith(basePath)) {
            await control.tagFile(tags, p);
        } else {
            console.log(`invalid path "${p}" you can use append while in "${config.getPath()}"`)
            process.exit()
        }
    }
    await control.tagContent(tags, obj);

    process.exit();
}

main()