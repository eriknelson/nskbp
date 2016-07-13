module.exports = function createDb() {
  const db = {};

  return {
    get: function (key) {
      return db[key];
    },
    set: function(key, val) {
      db[key] = val;
    },
    _getDatabase() {
      return db;
    }
  };

};
