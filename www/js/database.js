var db = null;

function setTableDatabase() {
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
    
        db.transaction(function(tx) {

            tx.executeSql('CREATE TABLE IF NOT EXISTS postImage (pid STRING PRIMARY KEY, picture STRING)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS userPicture (uid STRING PRIMARY KEY, picture STRING, pversion INTEGER)');
    
            
        }, function(error) {
            console.log('transaction setTableDatabase error: ' + error.message);
            db.close();
            console.log('database is closed ok');
        }, function() {
            console.log('transaction setTableDatabase ok');
            db.close(function() {
                console.log('database is closed ok');
                prova();
            });
        });
    
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
}

function insertPostImage(pid, picture) {
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
        db.transaction(function (tx) {

            var query = "INSERT INTO postImage (pid, picture) VALUES (?,?)";
    
            tx.executeSql(query, [pid, picture], function(tx, res) {
                // console.log("insertId: " + res.insertId + " -- probably 1");
                // console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
            },
            function(tx, error) {
                console.log('INSERT error: ' + error.message);
            });
        }, function(error) {
            console.log('transaction insertPostImage error: ' + error.message);
        }, function() {
            console.log('transaction insertPostImage ok');
            db.close(function() {
                console.log('database is closed ok');
            });
        });        
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
}

function insertUserPicture(uid, picture, pversion) {
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
        db.transaction(function (tx) {

            var query = "INSERT INTO userPicture (uid, picture, pversion) VALUES (?,?,?)";
    
            tx.executeSql(query, [uid, picture, pversion], function(tx, res) {
                // console.log("insertId: " + res.insertId + " -- probably 1");
                // console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
            },
            function(tx, error) {
                console.error('INSERT error: ' + error.message);
            });
        }, function(error) {
            console.error('transaction insertUserPicture error: ' + error.message);
            db.close();
        }, function() {
            console.log('transaction insertUserPicture ok');
            db.close(function() {
                console.log('database is closed ok');
            });
        });
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
}

function setUserPicture(uid, picture, pversion) {
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
        db.transaction(function (tx) {

            var query = "UPDATE userPicture SET picture = ? pversion = ? WHERE uid = ?";
    
            tx.executeSql(query, [picture, pversion, uid], function(tx, res) {
                // console.log("insertId: " + res.insertId + " -- probably 1");
                // console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
            },
            function(tx, error) {
                console.error('UPDATE userPicture error: ' + error.message);
            });
        }, function(error) {
            console.error('transaction setUserPicture error: ' + error.message);
            db.close();
        }, function() {
            console.log('transaction setUserPicture ok');
            db.close(function() {
                console.log('database is closed ok');
            });
        });
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
}


function getPostImage() {
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
        db.transaction(function (tx) {

            var query = "SELECT * FROM postImage";
    
            tx.executeSql(query, [], function (tx, resultSet) {
                // console.log(resultSet.rows);
                return resultSet;
            },
            function (tx, error) {
                console.error('getPostImage error: ' + error.message);
            });
        }, function (error) {
            console.error('transaction getPostImage error: ' + error.message);
            db.close();
        }, function () {
            console.log('transaction getImgPost ok');
            db.close(function() {
                console.log('database is closed ok');
            });
        });
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
}

//metodo che mi ristituisce una lista composta da uid, immagini, pversion 
function getUserPicture() {
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {
        db.transaction(function (tx) {

            var query = "SELECT * FROM userPicture";
    
            tx.executeSql(query, [], function (tx, resultSet) {
                return resultSet;
            },
            function (tx, error) {
                console.log('getUserPicture error: ' + error.message);
            });
        }, function (error) {
            console.log('transaction getUserPicture error: ' + error.message);
            db.close();
            console.log('database is closed ok');
        }, function () {
            console.log('transaction getUserPicture ok');
            db.close(function() {
                console.log('database is closed ok');
            });
        });
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
}



function prova() {
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {

        
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
}