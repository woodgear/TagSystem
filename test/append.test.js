const expect = require('expect.js');
const fs = require('fs');


const manager = require('../src/model/manager');

const append = require('../src/model/append');
const log = require('../util/log');


describe('append', function () {
    describe('#append', function () {
        const man = new manager();
        before(() => {
            man.init(__dirname);
        })
        after(() => {
            man.clear();
        })

        it('append file a tag', async () => {
            const app = new append();
            await app.append("./test.pdf", "test");
            

        });
    });
});
