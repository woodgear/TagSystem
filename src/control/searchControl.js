const Search = require("../model/search");
class searchControl {
    constructor() {
        this.model = new Search();
    }
    async search(tags) {
        return this.model.include(tags);
    }
}

async function main() {
    const control = new searchControl();
    tags = process.argv.slice(2)
    const objects = await control.search(tags);
    objects.map((object) => {
        console.log(object);
    })
    process.exit();
}

main()