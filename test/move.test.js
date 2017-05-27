const expect = require('expect.js');
const fs = require('fs');
const assert = require('assert')
const remove = require('remove');


const manager = require('../src/model/manager');
const config = require('../src/model/config');
const move=require('../src/model/move')
const tag = require('../src/dbmodel/tag');
const log = require('../util/log');

const createfiles = [
    `${__dirname}/../.tagsys`,
    `${__dirname}/../.tagsys/tagsys.db`,
    `${__dirname}/../config.json`
]

describe('move', function () {
    describe('#move', function () {
        before(() => {
        })
        after(() => {
            for (let path of createfiles) {
                if (fs.existsSync(path)) {
                    remove.removeSync(path)
                }
            }
        })
        it('should change object', async () => {
            const man = new manager();
            await man.init(`${__dirname}/..`);
            const t = new tag();
            const data=await t.findOrCreate("test");
            expect(data).to.eql(1);
        });
    });
});
