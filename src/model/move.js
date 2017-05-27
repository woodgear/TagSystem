const dbobj = require('../../util/dbobj')

class move {
    constructor() {
        this.object = dbobj.get('object');
    }
    move(src, dest) {
        this.object.updateObj(src, dest);
    }
}

module.exports = move;