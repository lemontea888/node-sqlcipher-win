
The [node-sqlite3](https://github.com/mapbox/node-sqlite3) module with [SQLCipher](https://www.zetetic.net/sqlcipher/) focus on Windows platfrom.



## Explanation

Description of the [node-sqlite3 building for sqlcipher](https://github.com/mapbox/node-sqlite3#building-for-sqlcipher) ,

I can't understand how to setting on Windows.

Thanks to [journeyapps](https://github.com/journeyapps) for his [node-sqlcipher](https://github.com/journeyapps/node-sqlcipher),

I modify [node-sqlite3](https://github.com/mapbox/node-sqlite3) and reference [node-sqlcipher](https://github.com/journeyapps/node-sqlcipher) for build with sqlcipher on Windows.

The ``` node-sqlcipher-win ``` module is result.

#

Modify from [node-sqlite3](https://github.com/mapbox/node-sqlite3) version 4.0.9,

[OpenSSL](https://www.openssl.org/) version [1.1.1c](https://www.openssl.org/source/openssl-1.1.1c.tar.gz) compiled static libraries and

[SQLCipher](https://www.zetetic.net/sqlcipher/) version [4.20](https://github.com/sqlcipher/sqlcipher) source files by nmake modify

is bundled.



## Supported platforms

The ``` node-sqlcipher-win ``` module should works on Node.js v4.x, v6.x, v8.x, v10.x, v11.x and v12.x .

### node tested : 

Windows 7 x64 - Node.js  v8.16.0 , v10.16.0 , v12.4.0 .

Windows 10 x86 - Node.js  v8.16.0 , v10.16.0 , v12.4.0 .

Windows 10 x64 -

### electron tested :

Windows 7 x64 - Electron 3.1.11 , Electron 4.2.5 , Electron 5.0.5 

Windows 10 x86 - 

Windows 10 x64 -


## installing

### Requirements on Windows:

(1) "[Git](https://git-scm.com/) for [Windows](https://git-scm.com/download/win)".

(2) "[Python](https://www.python.org/) version 2.7.x for [Windows](https://www.python.org/downloads/windows)".

(3) "Build tools for visual studio 2017"

 **Note:**  You can use ` npm -g install windows-build-tools ` to download "Python 2.7.x" and "Build tools for visual studio 2017" then Install them manually , lastly , [install "VC++ 2015.3 v140 toolset(x86,x64)" component Under Desktop development with C++ workloads on "build tools for visual studio 2017"](https://devblogs.microsoft.com/cppblog/visual-studio-build-tools-now-include-the-vs2017-and-vs2015-msvc-toolsets) and install optional '[Windows 8.1 SDK and UCRT SDK](https://devblogs.microsoft.com/wp-content/uploads/sites/9/2019/02/buildtools1102.png)' .
 
(4) Start ``` VS 2017 x64 Native Tools Command ``` or ``` VS 2017 x86 Native Tools Command ``` for execute ``` npm ``` command.

**Note:** Example for the X64 on ``` Start Menu ``` -> ``` All Programs ``` -> ``` Visual Studio 2017 ``` -> ``` Visual Studio Tools ``` -> ``` VC ``` -> ``` VS 2017 x64 Native Tools Command ``` .

### node

download and install the `node-sqlcipher-win` module:

``` npm install -save https://github.com/lemontea888/node-sqlcipher-win --build-from-source --verbose ```

The command can install package and shows detailed information on build-from-source.

### electron

Must be setting " Windows environment variable " for link Windows libraries ``` Crypt32.Lib ``` and ``` WS2_32.Lib ``` ,

example on x64 with '[Windows 8.1 SDK and UCRT SDK](https://devblogs.microsoft.com/wp-content/uploads/sites/9/2019/02/buildtools1102.png)' : 

set variable ` LIBPATH ` value ` C:\Program Files (x86)\Windows Kits\8.1\Lib\winv6.3\um\x64 `

set variable ` INCLUDE ` value ` C:\Program Files (x86)\Windows Kits\8.1\Include `

and your command needs these additional flags

( be sure to replace the target version with the current Electron version you are working with ) : 

``` --runtime=electron --target=5.0.5 --dist-url=https://atom.io/download/electron ```

## API

See the node-sqlite3 [API documentation](https://github.com/mapbox/node-sqlite3/wiki) in the wiki.



## Usage

``` /usage-example/usage-sqlite.js ```

**Note:** the module must be [installed](#installing) before use.

```

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

```



## Usage with Sequelize

``` /usage-example/usage-sqlcipher.js ```

**Note:** The [Sequelize](http://docs.sequelizejs.com) must be [installed](https://github.com/sequelize/sequelize#installation) and 

database file 'SQLite3.DB' must be created use the ` /usage-example/usage-sqlite.js `.

```

const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(null,null,'node6.x_EOL_2019-04-30',{
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 10,
        min: 0,
        acquire: 16888,
        idle: 8888
    },
    storage: path.join(__dirname,'./SQLite3.DB')
});

sequelize.query("SELECT info FROM lorem").then(function(results){
    console.log(results);
}).catch(function(error){
    console.log(error);
}).then(function(){
    sequelize.close();
});

```



## How to modify the module

The [SQLCipher.md](https://github.com/journeyapps/node-sqlcipher/blob/master/SQLCipher.md) document is from [journeyapps](https://github.com/journeyapps)'s [node-sqlcipher](https://github.com/journeyapps/node-sqlcipher).

This explains in detail how to modify the module for Windows.




## Contributors

* [Konstantin Käfer](https://github.com/kkaefer)
* [Dane Springmeyer](https://github.com/springmeyer)
* [Will White](https://github.com/willwhite)
* [Orlando Vazquez](https://github.com/orlandov)
* [Artem Kustikov](https://github.com/artiz)
* [Eric Fredricksen](https://github.com/grumdrig)
* [John Wright](https://github.com/mrjjwright)
* [Ryan Dahl](https://github.com/ry)
* [Tom MacWright](https://github.com/tmcw)
* [Carter Thaxton](https://github.com/carter-thaxton)
* [Audrius Kažukauskas](https://github.com/audriusk)
* [Johannes Schauer](https://github.com/pyneo)
 [Mithgol](https://github.com/Mithgol)



## Acknowledgments

### node-sqlite3

Thanks to [Orlando Vazquez](https://github.com/orlandov),
[Eric Fredricksen](https://github.com/grumdrig) and 
[Ryan Dahl](https://github.com/ry) for their SQLite bindings for node, and to mraleph on Freenode's #v8 for answering questions.

Development of this module is sponsored by [MapBox](http://mapbox.org/).

### node-sqlcipher

Thanks to [journeyapps](https://github.com/journeyapps) for his [node-sqlcipher](https://github.com/journeyapps/node-sqlcipher).



## License

``` node-sqlcipher-win ``` is [BSD licensed](https://github.com/lemontea888/node-sqlite3-sqlcipher/raw/master/LICENSE).


