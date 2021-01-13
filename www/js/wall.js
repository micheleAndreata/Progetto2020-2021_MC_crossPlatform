
var networkManager = new NetworkManager();

function getWall(){
    $("#myWall").html("");
    $("#notMyWall").html("");
    networkManager.getWall(
        (response) => {
            let wall = response.channels;
            for (let i = 0; i < wall.length; i++) {
                const channel = wall[i];
                if (channel.mine == "t"){
                    $("#myWall").append("<li class='channelClick'>"+channel.ctitle+"</li>");
                }
                else {
                    $("#notMyWall").append("<li class='channelClick'>"+channel.ctitle+"</li>");
                }
            }
            $(".channelClick").click(onChannelClick);
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