
var networkManager = new NetworkManager();
var profile = JSON.parse(localStorage.getItem("profile"));

// NAME
function showProfileName(){
    if (typeof(profile.name) != 'undefined') {
        let name = profile.name;
        $('#nameProfile').html('<h3>' + name + '</h3>');
    } else {
        $('#nameProfile').html('<p class="alert alert-danger">Nessun nome inserito</p>');
    }
}
function setProfileName() {
    let modalEditName = bootstrap.Modal.getInstance(document.getElementById('modalEditName'));
    let name = $('#inputEditName').val();
    modalEditName.hide();
    networkManager.setProfile(name, null, (response) => {
        profile.name = name;
        localStorage.setItem("profile", JSON.stringify(profile));
        profile = JSON.parse(localStorage.getItem("profile"));
        showProfileName();
    });
}

// PICTURE
function showProfilePicture(){
    if (typeof(profile.picture) != 'undefined') {
        let picture = profile.picture;
        $("#imageProfile").attr("src", "data:image/jpeg;base64, " + picture);

    } else {
        $("#imageProfile").attr("src", "img/userPicture.png");
    }
}

function setProfilePicture(picture) {
    networkManager.setProfile(null, picture, (response) => {
        profile.picture = picture;
        localStorage.setItem("profile", JSON.stringify(profile));
        profile = JSON.parse(localStorage.getItem("profile"));
        showProfilePicture(); 
    });
}

function onChangeProfilePic(){
    let options = {
        quality: 30,
        targetHeight: 200,
        targetWidth: 200,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };
    openFilePicker(options, setProfilePicture); 
}