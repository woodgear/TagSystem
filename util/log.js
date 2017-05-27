class Log {
    static d(message) {
        Log._log(message, ['debug']);
    }

    static i(message) {
        Log._log(message, ['debug']);
    }

    static e(message) {
        Log._log(message, ['debug']);
    }

    static _log(message, tag = []) {
    }
}

module.exports = Log;