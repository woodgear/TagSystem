const append = require("../model/append");
const common = require("../../util/common");
const argv = process.argv;
const fs = require('fs')
const isValid = require('is-valid-path');
const TYPE = {
    File: "-f",
    Content: "-c",
    Recursion: "-r"
}
class appendControl {
    constructor() {
        this.append = new append();
    }
    async router(append) {
        switch (append.type) {
            case TYPE.Content:
                await this.tagContent(append.tags, append.obj);
                break;
            case TYPE.File:
                await this.tagFile(append.tags, append.obj);
                break;
            case TYPE.Recursion:
                await this.tagDirectory(append.tags, append.obj);
                break;
            default:
                break;
        }
    }
    async tagDirectory(tag, directory) {
    }

    async tagFile(tags, path) {
        for (let tag of tags) {
            await this.append.append(path,tag)

        }
    }
    async tagContent(tag, obj) {

    }

}

function detectTpye(obj) {
    if (isValid(obj)) {
        return TYPE.File;
    }
    return TYPE.Content;
}
function pickParams(params) {
    const res = { tags: [], type: TYPE.Content, obj: "" }
    if (params.length < 2) {
        console.log("to low params at list 2 ,tag and obj")
        process.exit()
    }
    const obj = params.pop();
    res.type = detectTpye(obj)

    //tag* (-r/-f/-c) content
    const maybetype = params[params.length - 1]
    for (let key in TYPE) {
        if (maybetype === TYPE[key]) {
            res.type = maybetype;
            params.pop();
            break;
        }
    }

    res.tags = params;
    res.obj = obj
    return res
}

async function main() {
    const control = new appendControl();
    params = process.argv.slice(2)
    const appendObject = pickParams(params)
    await control.router(appendObject);
    process.exit();
}

main()