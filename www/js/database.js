
class Database {
    static _instance = null;
    constructor(){
        this._db = null;
    }
    static getInsance(){
        if (Database._instance == null)
            Database._instance = new Database();
        return Database._instance;
    }
    static dbObjectToArray(dbObject){
        let out = new Array();
        for (let i=0; i < dbObject.length; i++){
            out.push(dbObject.item(i));
        }
        return out;
    }
    setupDatabase() {
        let successSetup = (db) => {
            db.transaction(
                (tx) => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS postImage (pid STRING PRIMARY KEY, picture STRING)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS userPicture (uid STRING PRIMARY KEY, picture STRING, pversion INTEGER)');
                }, 
                (tx, error) => console.error("db setup", "transaction error: " + error.message),
                () => console.log("db setup", 'transaction ok'));
        };

        let errorSetup = (error) => console.error('Open database ERROR: ' + error.message);

        if (window.cordova.platformId === 'browser'){ 
            this._db = window.openDatabase('my.db', '1.0', 'Data', 2*1024*1024, successSetup, errorSetup);
        }
        else {
            this._db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'}, successSetup, errorSetup);
        }
    }
    insertPostImage(pid, image, successCallback, errorCallback) {
        let query = "INSERT INTO postImage (pid, picture) VALUES (?,?)";
        this.accessDatabase(query, [pid, image], successCallback, errorCallback, "insertPostImage");
    }
    insertUserPicture(uid, picture, pversion, successCallback, errorCallback) {
        let query = "INSERT INTO userPicture (uid, picture, pversion) VALUES (?,?,?)";
        this.accessDatabase(query, [uid, picture, pversion], successCallback, errorCallback, "insertUserPicture");
    }
    updateUserPicture(uid, picture, pversion, successCallback, errorCallback) {
        let query = "UPDATE userPicture SET picture = ?, pversion = ? WHERE uid = ?";
        this.accessDatabase(query, [picture, pversion, uid], successCallback, errorCallback, "updateUserPicture");
    }
    getPostImages(successCallback, errorCallback) {
        let query = "SELECT * FROM postImage";
        this.accessDatabase(query, [], successCallback, errorCallback, "getPostImages");
    }
    getUserPictures(successCallback, errorCallback) {
        let query = "SELECT * FROM userPicture";
        this.accessDatabase(query, [], successCallback, errorCallback, "getUserPictures");
    }
    debugClearTable(tableName){
        let query = "DELETE FROM "+ tableName +" WHERE true";
        this.accessDatabase(query, [], ()=>{console.log("clear success"), ()=>{console.error("clear error")}});
    }
    accessDatabase(query, inputs, onExecuteSuccess, onExecuteError, execution_tag){
        this._db.transaction(
            (tx) => tx.executeSql(query, inputs, onExecuteSuccess, onExecuteError), 
            (error) => console.error(execution_tag, "Transaction error: " + error.message),
            () => console.log(execution_tag, 'transaction ok')
        );
    }
}