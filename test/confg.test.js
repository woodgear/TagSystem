const expect = require('expect.js');
const config = require("../src/model/config.js")
const fs = require("fs")

describe("config", () => {
    describe("setPath", () => {
        it("should save path in json file", () => {
            const path = "testpath";
            config.setPath(path);
            const configString = fs.readFileSync(`${__dirname}/../config.json`).toString();
            const configJson = JSON.parse(configString);
            expect(configJson.path).to.be.eql(path);
        })
    })
    describe("getPath", () => {
        it("should get path in json file which is been set", () => {
            const path = "testpath";
            config.setPath(path);
            expect(config.getPath()).to.be.eql(path)
        })
    })

})