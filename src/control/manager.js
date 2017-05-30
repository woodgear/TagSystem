const manager = require("../model/manager");
const common = require("../../util/common");
const argv = process.argv;
const fs = require('fs')
class managerControl {
    constructor() {
        this.manager = new manager();
    }
    async init(path) {
        await this.manager.init(path);
    }

    async clear() {
        await this.manager.clear();
    }

}



async function main() {
    const control = new managerControl();
    switch (argv[2]) {
        case "init":
            const path = argv[3]
            await control.init(path)
            break;
        case "clear":
            await control.clear()
            break;

    }
    process.exit();
}

main()