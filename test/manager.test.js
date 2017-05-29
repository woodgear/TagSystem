const expect = require('expect.js');
const fs = require('fs');
const assert = require('assert')
const remove = require('remove');

const manager = require('../src/model/manager');
const log = require('../util/log');



describe('manager', function () {

    const path = __dirname;
    const createfiles = [
        `${path}/.tagsys`,
        `${path}/.tagsys/tagsys.db`,
    ];
    describe("#init", () => {
        before(() => {
            if (fs.existsSync(`${path}/.tagsys`)) {
                remove.removeSync(`${path}/.tagsys`)
            }
        })
        after(() => {
            if (fs.existsSync(`${path}/.tagsys`)) {
                remove.removeSync(`${path}/.tagsys`)
            }
        })

        it('should create a .tagsys and .tagsys/tagsys.db in spc path', async () => {
            const man = new manager();
            await man.init(path);
            for (let path of createfiles) {
                expect(fs.existsSync(path)).to.be.ok();
            }
        });

    })
    describe('#clear', function () {
        it('should remove a .tagsys and .tagsys/tagsys.db in spc path', async () => {
            const man = new manager();
            const path = __dirname;
            await man.init(path);
            await man.clear();

            for (let path of createfiles) {
                expect(fs.existsSync(path)).to.not.be.ok();
            }
        });
    });
});