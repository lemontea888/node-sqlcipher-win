
const path = require('path');
const Sqlite = require('sqlite3').verbose();

var db = new Sqlite.Database(path.join(__dirname,'./SQLite3.DB'));

db.serialize(function() {
    // SQLCipher uses just-in-time key derivation at the point it is first needed for an operation. 
    // This means that the key (and any options) must be set before the first operation on the database.
    db.run("PRAGMA key = 'node6.x_EOL_2019-04-30';");
   
    db.run("CREATE TABLE lorem (info TEXT)");
 
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();
   
    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
});
   
db.close();

