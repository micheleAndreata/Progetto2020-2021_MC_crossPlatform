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
            });
        });
    
    }, function (error) {
        console.log('Open database ERROR: ' + JSON.stringify(error));
    });
}

// function setTableDatabase() {
//     db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, (db) => {
//         db.transaction(
//                 (tx) => {
//                     tx.executeSql('CREATE TABLE IF NOT EXISTS postImage (pid STRING PRIMARY KEY, picture STRING)');
//                     tx.executeSql('CREATE TABLE IF NOT EXISTS userPicture (uid STRING PRIMARY KEY, picture STRING, pversion INTEGER)');
//                 }, 
//                 (tx, error) => db.close(() => console.error("setTable", "transaction error: " + JSON.stringify(error))),
//                 () => db.close(() => console.log("setTable", 'transaction ok. Database is closed')));
//         }, (error) => {
//             console.error('Open database ERROR: ' + JSON.stringify(error));
//         });
// }

function insertPostImage(pid, image, callback) {
    let query = "INSERT INTO postImage (pid, picture) VALUES (?,?)";
    accessDatabase(query, [pid, image], callback, "inserPostImage");
}

function insertUserPicture(uid, picture, pversion, callback) {
    let query = "INSERT INTO userPicture (uid, picture, pversion) VALUES (?,?,?)";
    accessDatabase(query, [uid, picture, pversion], callback, "inserUserPicture");
}

function updateUserPicture(uid, picture, pversion, callback) {
    let query = "UPDATE userPicture SET picture = ? pversion = ? WHERE uid = ?";
    accessDatabase(query, [picture, pversion, uid], callback, "updateUserPicture");
}


function getPostImages(callback) {
    let query = "SELECT * FROM postImage";
    accessDatabase(query, [], callback, "getPostImages");
}

function getUserPictures(callback) {
    let query = "SELECT * FROM userPicture";
    accessDatabase(query, [], callback, "getUserPictures");
}

function accessDatabase(query, inputs, onExecuteSuccess, execution_tag){
    db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, 
        (db) => {
            db.transaction(
                (tx) => tx.executeSql(query, inputs, onExecuteSuccess), 
                (tx, error) => db.close(() => console.error(execution_tag, "Database is closed. Transaction error: " + JSON.stringify(error))),
                () => db.close(() => console.log(execution_tag, 'transaction ok. Database is closed')));
        }, (error) => {
        console.error('Open database ERROR: ' + JSON.stringify(error));
    });
}