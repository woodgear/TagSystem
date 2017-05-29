const Search = require("../model/search");
class searchControl {
    constructor() {
        this.model = new Search();
    }
    async search(tags) {
        const objects = await this.model.include(tags);
        objects.map((object) => {
            console.log(object);
        })

    }
}

async function main() {
    const control = new searchControl();
    tags = process.argv.slice(2)
    await control.search(tags);
    process.exit();
}

main()