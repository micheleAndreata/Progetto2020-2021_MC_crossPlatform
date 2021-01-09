
var networkManager;
var profile = {};

$(document).on("deviceready", () => {
    console.log("device ready");
    networkManager = new NetworkManager();
    bindEvents();
    checkRegistration();
});

function checkRegistration(){
    if(typeof(localStorage.profile) == "undefined"){
        networkManager.register(
            (response) => {
                profile.sid = response.sid;
                localStorage.setItem("profile", JSON.stringify(profile));
                console.log("registrazione effettuata con successo");
                console.log(profile);
                getWall();
            }, (error) => {
                console.log(error);
            }
        );
    }
    else {
        profile = JSON.parse(localStorage.getItem("profile"));
        console.log("utente già registrato");
        console.log(profile);
        getWall();
    }
}

function bindEvents(){
    //Events to bind
    $("#addChannelConfirm").click(addChannel);
    $("#editNameConfirm").click(setNameProfile);
    $("#btnImage").click(openFilePicker);
}

function showPage(cssClass){
    $(".page").hide();
    $(cssClass).show();
}

function getWall(){
    $("#myWall").html("");
    $("#notMyWall").html("");
    networkManager.getWall(
        (response) => {
            let wall = response.channels;
            for (let i = 0; i < wall.length; i++) {
                const channel = wall[i];
                if (channel.mine == "t"){
                    $("#myWall").append("<li>"+channel.ctitle+"</li>");
                }
                else {
                    $("#notMyWall").append("<li>"+channel.ctitle+"</li>");
                }
            }
        }, (error) => {
            console.log(error);
        }
    )
}

function addChannel(){
    let addChannelModal = bootstrap.Modal.getInstance(document.getElementById('addChannelModal'));
    addChannelModal.hide();

    let ctitle = $("#newChannelName").val();
    $("#newChannelName").val("");
    
    networkManager.addChannel(
        ctitle,
        (response) => {
            getWall();
        }, (error) => {
            console.log(error);
        }
    );
}
