const expect = require('expect.js');
const Manager = require('../src/model/manager');
const Search = require('../src/model/search');
const Append = require('../src/model/append');
const Show = require('../src/model/show');

describe('show', () => {
    const man = new Manager();
    beforeEach(async () => {
        await man.clear();
        await man.init(__dirname);
    })
    afterEach(async () => {
        await man.clear();
    })
    describe('#showAllTag', async () => {
        it('should return the all the tag', async () => {
            const app = new Append();
            await app.append('object', 'tag');
            await app.append('object', 'tag1');
            await app.append('object', 'tag2');
            await app.append('object', 'tag3');
            await app.append('object', 'tag4');
            const show = new Show();
            const tags = await show.showAllTag();
            expect(tags).to.be.eql(['tag', 'tag1', 'tag2', 'tag3', 'tag4']);
        });
        it('should return the all the tag which be tag a spec object', async () => {
            const app = new Append();
            await app.append('object', 'tag');
            await app.append('object', 'tag1');
            await app.append('object1', 'tag2');
            await app.append('object2', 'tag3');
            await app.append('object3', 'tag4');
            const show = new Show();
            const tags = await show.showTagByObject('object');
            expect(tags).to.be.eql(['tag', 'tag1']);
        });

    });
});
