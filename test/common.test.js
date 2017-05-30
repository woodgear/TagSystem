const common = require('../util/common');
const expect = require('expect.js');
const config = require("../src/model/config.js")
const fs = require("fs")

describe("common", () => {
    describe("isRealPath", () => {
        it("should return is path is real", () => {
            const basepath = "/home/wucong/home/Lab/TagSystem";
            const params = "/config.json";
            const res=common.isRealPath(basepath,params);
    })
    });
});