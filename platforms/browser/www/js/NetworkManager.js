// variabili globali
var baseURL = "https://ewserver.di.unimi.it/mobicomp/accordo/";


// funzione di registrazione utente
function register() { 
    // definisco l'url di registrazione
    registerURL = baseURL + "register.php";
    
    $.ajax({
        method: 'get',
        url: registerURL,
        dataType: 'json',
        success: function (result) {
            console.log(result.sid);
            setTableProfile(result.sid)
        },
        error: function (error) {
            console.error(error);
        }
    })

}

function getProfile(sid) {
    getProfileURL = baseURL + "getProfile.php";

    $.ajax({
        method: 'post',
        url: getProfileURL,
        data: JSON.stringify({
            sid: sid
        }),
        dataType: 'json',
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.error(error);
        }
    })
}