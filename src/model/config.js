const fs = require('fs')
const congfigPath = `${__dirname}/../../config.json`

//the tagsystem software config
//save the path of tagsystem path
class Config {
    static setPath(path) {
        const configString = fs.readFileSync(congfigPath).toString();
        const configJson = JSON.parse(configString);
        configJson.path = path;
        fs.writeFileSync(congfigPath, JSON.stringify(configJson));
    }
    static getPath() {
        const config = fs.readFileSync(congfigPath).toString();
        return JSON.parse(config).path;
    }
}

module.exports = Config;