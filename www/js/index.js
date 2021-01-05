
var networkManager;

$(function () {
    console.log("Document ready");
    networkManager = new NetworkManager();
    bindEvents();
    getWall();
})

function bindEvents(){
    //Events to bind
    $("#addChannelConfirm").click(addChannel);
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
