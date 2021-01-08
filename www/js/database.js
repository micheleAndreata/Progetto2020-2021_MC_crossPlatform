
function setTableDatabase() {
    let db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, (db) => {
        db.transaction(
                (tx) => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS postImage (pid STRING PRIMARY KEY, picture STRING)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS userPicture (uid STRING PRIMARY KEY, picture STRING, pversion INTEGER)');
                }, 
                (tx, error) => db.close(() => console.error("setTable", "transaction error: " + JSON.stringify(error))),
                () => db.close(() => console.log("setTable", 'transaction ok. Database is closed')));
        }, (error) => {
            console.error('Open database ERROR: ' + JSON.stringify(error));
        });
}

function insertPostImage(pid, image, successCallback, errorCallback) {
    let query = "INSERT INTO postImage (pid, picture) VALUES (?,?)";
    accessDatabase(query, [pid, image], successCallback, errorCallback, "inserPostImage");
}

function insertUserPicture(uid, picture, pversion, successCallback, errorCallback) {
    let query = "INSERT INTO userPicture (uid, picture, pversion) VALUES (?,?,?)";
    accessDatabase(query, [uid, picture, pversion], successCallback, errorCallback, "inserUserPicture");
}

function updateUserPicture(uid, picture, pversion, successCallback, errorCallback) {
    let query = "UPDATE userPicture SET picture = ? pversion = ? WHERE uid = ?";
    accessDatabase(query, [picture, pversion, uid], successCallback, errorCallback, "updateUserPicture");
}


function getPostImages(successCallback, errorCallback) {
    let query = "SELECT * FROM postImage";
    accessDatabase(query, [], successCallback, errorCallback, "getPostImages");
}

function getUserPictures(successCallback, errorCallback) {
    let query = "SELECT * FROM userPicture";
    accessDatabase(query, [], successCallback, errorCallback, "getUserPictures");
}

function accessDatabase(query, inputs, onExecuteSuccess, onExecuteError, execution_tag){
    let db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, 
        (db) => {
            db.transaction(
                (tx) => tx.executeSql(query, inputs, onExecuteSuccess, onExecuteError), 
                (tx, error) => db.close(() => console.error(execution_tag, "Database is closed. Transaction error: " + JSON.stringify(error))),
                () => db.close(() => console.log(execution_tag, 'transaction ok. Database is closed')));
        }, (error) => {
        console.error('Open database ERROR: ' + JSON.stringify(error));
    });
}