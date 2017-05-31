const dbobj = require('../../util/dbobj')

class move {
    constructor() {
        this.object = dbobj.get('object');
    }
    async move(src, dest) {
       await this.object.updateObj({object:src,type:"file"}, {object:dest,type:"file"});
    }
}

module.exports = move;