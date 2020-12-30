$(function () {
    document.addEventListener("deviceready", onDeviceReady, false);
})

function successCallback() {
    console.log("ok");
}

function errorCallback(){
    console.error(error)
}

// function onDeviceReady() {

//     // window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'}, function(db) {
//     //     db.transaction(function(tx) {
//     //       // ...
//     //     }, function(err) {
//     //       console.log('Open database ERROR: ' + JSON.stringify(err));
//     //     });
//     // });

//     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//     document.getElementById('deviceready').classList.add('ready');
//     db = window.sqlitePlugin.openDatabase({
//         name: 'my.db',
//         location: 'default',
//     });
//     db.sqlBatch([
//         'DROP TABLE IF EXISTS DemoTable',
//         'CREATE TABLE IF NOT EXISTS DemoTable (name, score)',
//         [ 'INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101] ],
//         [ 'INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202] ],
//       ], function() {
//         console.log('MyTable is now populated.');
//       }, function(error) {
//         console.log('Populate table error: ' + error.message);
//     });
// }

// Cordova is ready
function onDeviceReady() {
    
   
}


function setTableProfile(sid) {
    
    db.transaction(function(tx) {

        tx.executeSql('CREATE TABLE IF NOT EXISTS profile (sid STRING, name STRING, picture STRING, pversion INTEGER, uid INTEGER)');

        tx.executeSql('INSERT INTO profile (sid) VALUES (?)', [sid], function(tx, resultSet) {
        // console.log('resultSet.insertId: ' + resultSet.insertId);
        // console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
        }, function(tx, error) {
            console.log('INSERT setTableProfile error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction setTableProfile error: ' + error.message);
    }, function() {
        console.log('transaction setTableProfile ok');
    });
}


function updateTableProfile(jsonObject) {
    let sid = jsonObject.sid;
    let uid = jsonObject.uid;
    let nome = jsonObject.name;
    let picture = jsonObject.picture;
    
    db.transaction(function (tx) {

        var query = "UPDATE prifile SET uid = ?, nome = ?, picture = ? WHERE sid = ?";

        tx.executeSql(query, [uid, nome, picture, sid], function(tx, res) {
            // console.log("insertId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function(tx, error) {
            console.log('UPDATE error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });

}














function checkSID() {
    db.transaction(function (tx) {

        var query = "SELECT sid FROM profile";

        tx.executeSql(query, [], function (tx, resultSet) {

            for(var x = 0; x < resultSet.rows.length; x++) {
                console.log("Sid DB: " + resultSet.rows.item(x).sid);
                getProfile(resultSet.rows.item(x).sid);
            }
        },
        function (tx, error) {
            console.log('SELECT checkSID error: ' + error.message);
            
        });
    }, function (error) {
        console.log('transaction checkSID error: ' + error.message);
        
    }, function () {
        console.log('transaction checkSID ok');
        
    });
}