const Show = require("../model/show");
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
    if (params[0] == '-o') {
        await control.showTAGByObj(params[1]);
    } else {
        await control.showAllTag();
    }

    process.exit();
}

main()