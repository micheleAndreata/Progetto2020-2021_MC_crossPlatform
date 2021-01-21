
var networkManager;
var db;
var profile = {};

$(document).on("deviceready", () => {
    console.log("device ready");
    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGVsZWFuZHJlYXRhIiwiYSI6ImNrMzcyODJ1NjA3ZWQzbW85emg2cWxkbHMifQ.o2QEcqmKEjqtxpcLikWdCw';
    networkManager = new NetworkManager();
    profile = {};
    db = new Database();
    db.setupDatabase();
    bindEvents();
    checkRegistration();
});

function bindEvents(){
    //Events to bind
    $("#addChannelConfirm").click(addChannel);
    $("#backBtn").click(toPageWall);
    $("#toProfileBtn").click(toPageProfile)
    $("#editNameConfirm").click(setProfileName);
    $("#changeProfilePicBtn").click(onChangeProfilePic);
    $("#sendText").click(onSendText);
    $("#sendImage").click(onSendImage);
    $("#sendLocation").click(onSendLocation);
    $("#closeMapBtn").click(onCloseMap);
}

function checkRegistration(){
    if(typeof(localStorage.profile) == "undefined"){
        networkManager.register(
            (response) => {
                profile.sid = response.sid;
                localStorage.setItem("profile", JSON.stringify(profile));
                console.log("registrazione effettuata con successo");
                getWall();
            }, (error) => {
                console.log(error);
            }
        );
    }
    else {
        profile = JSON.parse(localStorage.getItem("profile"));
        console.log("utente già registrato");
        getWall();
    }
}

function toPageWall(){
    $("#backBtn").hide();
    $("#pageTitle").html("Accordo");
    showPage(".pageWall");
}

function toPageProfile(){
    $("#backBtn").show();
    $("#pageTitle").html("Profilo");
    showProfileName();
    showProfilePicture();
    showPage(".pageProfile");
}

function showPage(cssClass){
    $(".page").hide();
    $(cssClass).show();
}
