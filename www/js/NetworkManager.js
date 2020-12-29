/*
    Funzioni chiamate al DB 
*/

// @todo gestire errore 401 nel caso venga fornito un sid non valido

// variabili globali
var baseURL = "https://ewserver.di.unimi.it/mobicomp/accordo/";
var sidTemp = 'reFG9u0a2BWjU7Jg';

// funzione di registrazione utente
function register() { 
    // definisco l'url di registrazione
    registerURL = baseURL + "register.php";
    
    $.ajax({
        method: 'get',
        url: registerURL,
        dataType: 'json',
        success: function (result) {
            console.log("register result: " + result);
            setTableProfile(result.sid)
        },
        error: function (error) {
            console.error("register response code: " + error);
        }
    })

}

function getProfile(sid) {
    getProfileURL = baseURL + "getProfile.php";

    $.ajax({
        method: 'get',
        url: getProfileURL,
        data: JSON.stringify({
            sid: sid
        }),
        dataType: 'json',
        success: function (result) {
            console.log("getProfile result: " + result);
            return result;
        },
        error: function (error) {
            console.error("getProfile response code: " + error);
            return error;
        }
    })
}

// setProfile gli viene passato jsonContent che è una stringa JSON.stringify(sid : 'sid_obbligatorio', nome : 'nome', immagine : 'immagine) almeno uno tra nome e immagine va inserito
function setProfile(jsonContent) {
    setProfileURL = baseURL + "setProfile.php";

    $.ajax({
        method: 'post',
        url: setProfileURL,
        data: jsonContent,
        success: function (result) {
            console.log("setProfile response OK");
            return true;
        },
        error: function (error) {
            console.error("setProfile response code: " + error);
        }
    })
}

// addChannerl gli viene passato jsonContent che è una string JSON.stringify(sid : 'sid', ctitle : 'ctitle_max20')
function addChannel(jsonContent) {
    addChannelURL = baseURL + "addChannel.php";

    $.ajax({
        method: 'post',
        url: addChannelURL,
        data: jsonContent,
        success: function (result) {
            console.log("addChannel response OK");
            return true;
        },
        error: function (error) {
            console.error("addChannel response code: " + error);
            // @todo gestire error 400: il titolo inserito esiste già
        }
    })
}

function getWall(sid) {
    getWallURL = baseURL + "getWall.php";

    $.ajax({
        method: 'get',
        url: getWallURL,
        data: JSON.stringify({
            sid: sid
        }),
        dataType: 'json',
        success: function (result) {
            console.log("getWall result: " + result);
            // @todo update local db
            return result;
        },
        error: function (error) {
            console.error("getWall response code: " + error);
            return error;
        }
    })
}


// addPost gli viene passato jsonContent che è una string JSON.stringify(sid : 'sid', ctitle : 'ctitle', type : 't/i/p', ...)
// Se type->t/i = devono avere il valore 'content', mentre i type->p = devono avere il valore 'lat' e 'lon' 
function addPost(jsonContent) {
    addPostURL = baseURL + "addPost.php";

    $.ajax({
        method: 'post',
        url: addPostURL,
        data: jsonContent,
        success: function (result) {
            console.log("addPost response OK");
            return true
        },
        error: function (error) {
            console.error("addPost response code: " + error);
            // @todo gestire error 400: il titolo inserito esiste già
        }
    })
}

// getChannerl gli viene passato jsonContent che è una stringa JSON.stringify(sid : 'sid', ctitle : 'ctitle')
function getChannel(jsonContent) {
    getChannelURL = baseURL + "getChannel.php";

    $.ajax({
        method: 'get',
        url: getChannelURL,
        data: jsonContent,
        dataType: 'json',
        success: function (result) {
            consoles.log("getChannel result: " + result);
            // update local DB ???
            return result;
        },
        error: function (error) {
            console.error("getChannel responde code: " + error);
        }
    })
}