const Show = require("../model/show");
const config = require("../model/config");
const common = require("../../util/common");
const fs = require('fs');
class ShowControl {
    constructor() {
        this.model = new Show();
    }
    async showAllTag() {
        const tags = await this.model.showAllTag();
        tags.map((tag) => {
            console.log(tag);
        });
    }
    async showTAGByObj(obj) {
        const tags = await this.model.showTagByObject(obj);
        tags.map((tag) => {
            console.log(tag);
        });

    }
}

async function main() {
    const control = new ShowControl();
    params = process.argv.slice(2)
    const basepath = fs.realpathSync(params.shift());
    if (params[0] == '-o') {
        const obj = params[1]

        const res = common.isRealPath(basepath, obj);
        if (res.isRealPath) {
            const storepath = config.getPath();
            const obj = res.res.slice(storepath.length);

            await control.showTAGByObj({ type: "file", object: obj });
        } else {
            await control.showTAGByObj({ type: "content", object: res.res });
        }
    } else {
        await control.showAllTag();
    }
    process.exit();
}

main()