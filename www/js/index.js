
var networkManager;
var db;
var profile = {};

$(document).on("deviceready", () => {
    console.log("device ready");
    networkManager = new NetworkManager();
    db = Database.getInsance();
    db.setupDatabase();
    bindEvents();
    checkRegistration();
});

function bindEvents(){
    //Events to bind
    $("#addChannelConfirm").click(addChannel);
    $("#backBtn").click(toPageWall);
    $("#toProfileBtn").click(toPageProfile)
    $("#editNameConfirm").click(setNameProfile);
    $("#btnImage").click(openFilePicker);
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
    showPage(".pageProfile");
}

function showPage(cssClass){
    $(".page").hide();
    $(cssClass).show();
}
