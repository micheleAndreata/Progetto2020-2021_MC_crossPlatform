
var networkManager = new NetworkManager();
var db = Database.getInsance();
var cTitle;

function onChannelClick(){
    cTitle = $(this).html();
    getChannel(cTitle);
}

function getChannel(cTitle){
    showPageChannel(cTitle);
    networkManager.getChannel(
        cTitle,
        response => {
            let posts = response.posts;
            showPosts(posts);
        }, error => {
            console.log(error);
        }
    );
}

function showPageChannel(cTitle){
    $("#backBtn").show();
    $("#pageTitle").html(cTitle);
    $("#posts").html("");
    showPage(".pageChannel");
}

function showPosts(posts){
    let userSet = {};
    let postImages = new Array();
    for (let i=0; i < posts.length; i++){
        userSet[posts[i].uid] = posts[i].pversion;
        let htmlContent = "<li>";
        htmlContent += "<div class='wrapText'>";
        htmlContent += "<img class='userPicture' data-uid='"+posts[i].uid+"' data-pversion='"+posts[i].pversion+"'>";
        htmlContent += posts[i].name;
        htmlContent += "</div>";
        if (posts[i].type == "t"){
            htmlContent += "<div class='wrapText'>"+posts[i].content+"</div>";
        } else if (posts[i].type == "i"){
            htmlContent += "<img class='postImage' data-pid='"+posts[i].pid+"'>";
            postImages.push(posts[i].pid);
        } else if (posts[i].type == "l"){
            htmlContent += "<div>"+posts[i].lat+" "+posts[i].lon+"</div>";
        }
        htmlContent += "</li>";
        $("#posts").append(htmlContent);
    }
    updateUserPictures(userSet);
    updatePostImages(postImages);
}

function updatePostImages(postImages){
    db.getPostImages(
        (tx,result) => {
            let dbPostImages = Database.dbObjectToArray(result.rows);
            postImages.forEach(pid => {
                let dbPostImage = dbPostImages.filter(p => p.pid == pid); //ritorna un array
                if (dbPostImage.length > 0){
                    showPostImage(pid, dbPostImage[0].picture);
                }
                else {
                    networkManager.getPostImage(
                        pid,
                        result => {
                            showPostImage(pid, result.content);
                            db.insertPostImage(pid, result.content);
                        }, error => {
                            console.error(error);
                        }
                    );
                }
            });
        }, error => {
            console.error(error);
        }
    );
}

function showPostImage(pid, image){
    if (image != null && isBase64(image)){
        $("*[data-pid='"+pid+"']").attr("src", "data:image/jpeg;base64, " + image);
    }
    else
        $("*[data-pid='"+pid+"']").hide();
}

function updateUserPictures(userSet){
    db.getUserPictures(
        (tx, result) => {
            let uidSet = Object.keys(userSet);
            let dbUserPictures = Database.dbObjectToArray(result.rows);
            uidSet.forEach(uid => {
                let dbUser = dbUserPictures.filter(user => user.uid == uid); //ritorna un array
                if (dbUser.length > 0){ //user con uid è presente nel DB?
                    let serverPVersion = userSet[uid];
                    let dbPVersion = dbUser[0].pversion;
                    if (dbPVersion < serverPVersion){
                        downloadAndUpdateUserPicture(uid);
                    } else {
                        showUserPicture(dbUser[0]);
                    }
                } else {
                    downloadAndInsertUserPicture(uid);
                }
            });
        }, (error) => {
            console.log(error);
        }
    );
}

function downloadAndUpdateUserPicture(uid){
    networkManager.getUserPicture(
        uid,
        result => {
            showUserPicture(result);
            db.updateUserPicture(result.uid, result.picture, result.pversion);
        }, error => {
            console.error(error);
        }
    );
}
function downloadAndInsertUserPicture(uid){
    networkManager.getUserPicture(
        uid,
        result => {
            showUserPicture(result);
            db.insertUserPicture(result.uid, result.picture, result.pversion);
        }, error => {
            console.error(error);
        }
    );
}

function showUserPicture(userPicture){
    if (userPicture.picture != null && isBase64(userPicture.picture))
        $("*[data-uid='"+userPicture.uid+"']").attr("src", "data:image/jpeg;base64, " + userPicture.picture);
    else
        $("*[data-uid='"+userPicture.uid+"']").attr("src", "img/logo.png");
}

function onSendText(){
    let text = $("#text").val();
    $("#text").val("");
    let jsonPost = {ctitle:cTitle, type:"t", content:text};
    networkManager.addPost(
        jsonPost,
        () => getChannel(cTitle),
        error => console.log(error)
    );
}

function onSendImage(){
    let options = {
        quality: 20,
        targetWidth: 300,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };
    openFilePicker(options, sendImage);
}
function sendImage(image){
    let jsonPost = {ctitle:cTitle, type:"i", content:image};
    networkManager.addPost(
        jsonPost,
        () => getChannel(cTitle),
        error => console.error(error)
    );
}
