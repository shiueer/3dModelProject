var fs = require('fs');

var rawdata = fs.readFileSync('DB_Config.json');
var db_config = JSON.parse(rawdata);

var mysql = require("mysql");
var pool = mysql.createPool({
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  port: db_config.port,
  database: db_config.database,
  // connectionLimit: 10, // 可以自己設定
});

var query = function (sql, options, callback) {
  // console.log(sql, options, callback);
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function (err, results, fields) {
        // callback
        callback(err, results, fields);
      });
      // release connection。
      // 要注意的是，connection 的釋放需要在此 release，而不能在 callback 中 release
      conn.release();
    }
  });
};

module.exports = query;