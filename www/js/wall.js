
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
                    $("#myWall").append("<li class='channelClick wallElement'>"+channel.ctitle+"</li>");
                }
                else {
                    $("#notMyWall").append("<li class='channelClick wallElement'>"+channel.ctitle+"</li>");
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

    let inputText = $("#newChannelName");
    let ctitle = (inputText.val()).trim();

    if (ctitle.length === 0){
        inputText.addClass("invalidInput");
        inputText.next().show();
        inputText.next().html("Inserisci un nome valido");
    }
    else {
        networkManager.addChannel(
            ctitle,
            (response) => {
                inputText.removeClass("invalidInput");
                inputText.next().html("");
                inputText.next().hide();
                addChannelModal.hide();
                inputText.val("");
                getWall();
            }, (error) => {
                inputText.addClass("invalidInput");
                inputText.next().show();
                inputText.next().html("Nome canale non disponibile");
            }
        );
    }
}