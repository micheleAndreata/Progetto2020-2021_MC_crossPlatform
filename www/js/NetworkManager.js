class NetworkManager{
    constructor(){
        this.baseURL = "https://ewserver.di.unimi.it/mobicomp/accordo/";
    }

    //Non è di sicuro il modo più elegante per farlo
    sid(){
        return (JSON.parse(localStorage.getItem("profile"))).sid;
    }

    register(onSuccess, onError){
        let requestURL = this.baseURL + "register.php";
        $.ajax({
            type: "GET",
            url: requestURL,
            dataType: "json",
            success: (response) => {
                console.log("register response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata register");
                onError(error);
            }
        });
    }
    getProfile(onSuccess, onError){
        let requestURL = this.baseURL + "getProfile.php";
        $.ajax({
            type: "POST",
            url: requestURL,
            data: JSON.stringify({sid:this.sid()}),
            dataType: "json",
            success: (response) => {
                console.log("getProfile response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata getProfile");
                onError(error);
            }
        });
    }
    setProfile(name, picture, onSuccess, onError){
        let requestURL = this.baseURL + "setProfile.php";
        $.ajax({
            type: "POST",
            url: requestURL,
            data: JSON.stringify({sid:this.sid(), name:name, picture:picture}),
            dataType: "json",
            success: (response) => {
                console.log("setProfile response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata setProfile");
                onError(error);
            }
        });
    }
    addChannel(ctitle, onSuccess, onError){
        let requestURL = this.baseURL + "addChannel.php";
        $.ajax({
            type: "POST",
            url: requestURL,
            data: JSON.stringify({sid:this.sid(), ctitle}),
            dataType: "json",
            success: (response) => {
                console.log("addChannel response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata addChannel");
                onError(error);
            }
        });
    }
    getWall(onSuccess, onError){
        let requestURL = this.baseURL + "getWall.php";
        $.ajax({
            type: "POST",
            url: requestURL,
            data: JSON.stringify({sid:this.sid()}),
            dataType: "json",
            success: (response) => {
                console.log("getWall response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata getWall");
                onError(error);
            }
        });
    }
    addPost(jsonPost, onSuccess, onError){
        let requestURL = this.baseURL + "addPost.php";
        jsonPost.sid = this.sid();
        $.ajax({
            type: "POST",
            url: requestURL,
            data: JSON.stringify(jsonPost),
            dataType: "json",
            success: (response) => {
                console.log("addPost response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata addPost");
                onError(error);
            }
        });
    }
    getChannel(ctitle, onSuccess, onError){
        let requestURL = this.baseURL + "getChannel.php";
        $.ajax({
            type: "POST",
            url: requestURL,
            data: JSON.stringify({sid:this.sid(), ctitle:ctitle}),
            dataType: "json",
            success: (response) => {
                console.log("getChannel response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata getChannel");
                onError(error);
            }
        });
    }
    getPostImage(pid, onSuccess, onError){
        let requestURL = this.baseURL + "getPostImage.php";
        $.ajax({
            type: "POST",
            url: requestURL,
            data: JSON.stringify({sid:this.sid(), pid:pid}),
            dataType: "json",
            success: (response) => {
                console.log("getPostImage response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata getPostImage");
                onError(error);
            }
        });
    }
    getUserPicture(uid, onSuccess, onError){
        let requestURL = this.baseURL + "getUserPicture.php";
        $.ajax({
            type: "POST",
            url: requestURL,
            data: JSON.stringify({sid:this.sid(), uid:uid}),
            dataType: "json",
            success: (response) => {
                console.log("getUserPicture response OK");
                onSuccess(response);
            },
            error: (error) => {
                console.log("ERRORE chiamata getUserPicture");
                onError(error);
            }
        });
    }
}