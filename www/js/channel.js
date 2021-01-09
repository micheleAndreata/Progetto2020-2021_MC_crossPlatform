
var networkManager = new NetworkManager();
var db = Database.getInsance();

function getChannel(){
    $("#posts").html("");
    showPage(".pageChannel");
    let cTitle = $(this).html();
    networkManager.getChannel(
        cTitle,
        response => {
            let posts = response.posts;
            visualizePosts(posts);
        }, error => {
            console.log(error);
        }
    );
}

function visualizePosts(posts){
    let userSet = {};
    let postImages = new Array();
    for (let i=0; i < posts.length; i++){
        userSet[posts[i].uid] = posts[i].pversion;
        let htmlContent = "<li>";
        htmlContent += "<img class='.userPicture' data-uid='"+posts[i].uid+"' data-pversion='"+posts[i].pversion+"'>";
        htmlContent += posts[i].name;
        if (posts[i].type == "t"){
            htmlContent += "<div>"+posts[i].content+"</div>";
        } else if (posts[i].type == "i"){
            htmlContent += "<img class='.postImage' data-pid='"+posts[i].pid+"'>";
            postImages.push(posts[i].pid);
        } else if (posts[i].type == "l"){
            htmlContent += "<div>"+posts[i].lat+" "+posts[i].lon+"</div>";
        }
        htmlContent += "</li>";
        $("#posts").append(htmlContent);
    }
    updateUserPictures(userSet);
}

function updateUserPictures(userSet){
    db.getUserPictures(
        (tx, result) => {
            let uidSet = Object.keys(userSet);
            let dbUserPictures = dbObjectToArray(result.rows);
            uidSet.forEach(uid => {
                let dbUser = dbUserPictures.filter(user => user.uid == uid); //ritorna un array
                if (dbUser.length > 0){ //user con uid è presente nel DB?
                    let serverPVersion = userSet[uid];
                    let dbPVersion = dbUser[0].pversion;
                    if (dbPVersion < serverPVersion){
                        networkManager.getUserPicture(
                            uid,
                            result => {
                                //TODO visualizza userPicture
                                db.updateUserPicture(result.uid, result.picture, result.pversion);
                            }, error => {
                                console.error(error);
                            }
                        );
                    } else {
                        //TODO visualizza userPicture
                    }
                } else {
                    networkManager.getUserPicture(
                        uid,
                        result => {
                            //TODO visualizza userPicture
                            db.insertUserPicture(result.uid, result.picture, result.pversion);
                        }, error => {
                            console.error(error);
                        }
                    );
                }
            });
        }, (error) => {
            console.log(error);
        }
    );
}

function dbObjectToArray(dbObject){
    out = new Array();
    for (let i=0; i < dbObject.length; i++){
        out.push(dbObject.item(i));
    }
    return out;
}
