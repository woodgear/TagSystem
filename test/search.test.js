const expect = require('expect.js');

const append = require('../src/model/append');
const manager = require('../src/model/manager');
const Search = require('../src/model/search');
describe('search', function () {
    describe('#include', function () {
        const man = new manager();
        beforeEach(async () => {
            await man.clear();
            await man.init(__dirname);
        })
        afterEach(async () => {
            await man.clear();
        })

        it('should return the objects which be taged', async () => {
            const app = new append();
            await app.append({ type: "content", object: 'object' }, 'tag');
            const search = new Search();
            const objects = await search.include('tag');
        });
        it('should return the [] which not tag', async () => {
            const search = new Search();
            const objects = await search.include('tag');
            expect(objects).to.eql([])
        });
        it('should return the objects which be taged', async () => {
            const app = new append();

            await app.append({ type: "content", object: 'object' }, 'tag');

            await app.append({ type: "content", object: 'object3' }, 'tag');
            await app.append({ type: "content", object: 'object3' }, 'tag1');

            await app.append({ type: "content", object: 'object1' }, 'tag');
            await app.append({ type: "content", object: 'object1' }, 'tag1');


            const search = new Search();
            const objects = await search.include(['tag', 'tag1']);
            expect(objects).to.be.eql(['object3', 'object1', 'object']);
        });
        it('should return the objects which be taged with a no exists tag', async () => {
            const app = new append();

            await app.append({ type: "content", object: 'object' }, 'tag');

            await app.append({ type: "content", object: 'object3' }, 'tag');
            await app.append({ type: "content", object: 'object3' }, 'tag1');

            await app.append({ type: "content", object: 'object1' }, 'tag');
            await app.append({ type: "content", object: 'object1' }, 'tag1');

            const search = new Search();
            const objects = await search.include(['tag', 'tag1', 'tag3']);
            expect(objects).to.be.eql(['object3', 'object1', 'object']);
        });



    });
});