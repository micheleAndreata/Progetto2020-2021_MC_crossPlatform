
var networkManager = new NetworkManager();
var cTitle;
var map;
var marker;

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
    posts.forEach(post => {

        userSet[post.uid] = post.pversion;
        if (post.type == "i")
            postImages.push(post.pid);
        
        let htmlPost = getHtmlPost(post)
        $("#posts").append(htmlPost);
    });
    $(".locationBtn").click(onShowLocation);
    updateUserPictures(userSet);
    updatePostImages(postImages);
}

function getHtmlPost(post){
    let html = `<li class="rounded-3 messageBackground mb-3">`;
    html += `
        <div>
            <img class='userPicture rounded' data-uid='`+post.uid+`' data-pversion='`+post.pversion+`'>
            <span class='wrapText'>`+post.name+`</span>
        </div>
    `;
    if (post.type == "t"){
        html += `
            <div class='m-2'>
                <div class='wrapText'>`+post.content+`</div>
            </div>
        `;
    } 
    else if (post.type == "i"){
        html += `
            <div class='d-flex justify-content-center align-items-center m-2'>
                <img class='postImage' style="max-height:200px" data-pid='`+post.pid+`'>
            </div>
        `;
    } 
    else if (post.type == "l"){
        html += `
            <div class='d-flex justify-content-center align-items-center m-2'>
                <button class='locationBtn btn btn-lg' data-lat='`+ post.lat +`' data-lon='`+ post.lon +`'>
                    <img src='img/location.png' width='40px' alt=''>
                    <span class='ms-2 align-middle'>Posizione Condivisa</span>
                </button>
            </div>
        `;
    }
    html += "</li>";
    return html;
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
    $("*[data-pid='"+pid+"']").attr("onerror", "this.onerror=null;this.src='';this.style.display='none';"); 
    $("*[data-pid='"+pid+"']").attr("src", "data:image/jpeg;base64, " + image);
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
    $("*[data-uid='"+userPicture.uid+"']").attr("onerror", "this.onerror=null;this.src='./img/userPicture.png';");
    $("*[data-uid='"+userPicture.uid+"']").attr("src", "data:image/jpeg;base64, " + userPicture.picture);
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
        quality: 10,
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

function onSendLocation(){
    let options = { enableHighAccuracy: true }; 
    if(!navigator.geolocation) {
        console.log('Geolocation is not supported'); 
    } 
    else {
        console.log('Locating...');
        navigator.geolocation.getCurrentPosition(
            sendLocation, 
            error => console.error(error),
            options); 
    }
}
function sendLocation(geolocation){
    let lat = geolocation.coords.latitude;
    let lon = geolocation.coords.longitude;
    let jsonPost = {ctitle:cTitle, type:"l", lat:lat, lon:lon};
    networkManager.addPost(
        jsonPost,
        () => getChannel(cTitle),
        error => console.error(error)
    );
}

function onShowLocation(event){
    let locationBtn;
    if ($(event.target).is(":button")){
        locationBtn = $(event.target);
    }
    else {
        locationBtn = $(event.target).parent();
    }
    let lat = locationBtn.data("lat");
    let lon = locationBtn.data("lon");
    $("#map").show();
    if (map == null){
        initMap();
    }
    if (marker != null){
        marker.remove();
    }
    map.setCenter([lon, lat]) // !!! ==> [lng, lat]
    marker = new mapboxgl.Marker()
        .setLngLat([lon, lat]) // !!! ==> [lng, lat]
        .addTo(map);
}

function onCloseMap(){
    $("#map").hide();
}

function initMap(){
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [0,0],
        zoom: 9 // starting zoom
    });
}