
var networkManager = new NetworkManager();
var profile = JSON.parse(localStorage.getItem("profile"));

// NAME
function showProfileName(){
    if (typeof(profile.name) != 'undefined') {
        let name = profile.name;
        $('#nameProfile').html('<h3 class="nameProfile">' + name + '</h3>');
    } else {
        $('#nameProfile').html('<div class="alert">Nessun nome inserito</div>');
    }
}
function setProfileName() {
    let modalEditName = bootstrap.Modal.getInstance(document.getElementById('modalEditName'));
    
    let name = ($('#inputEditName').val()).trim();

    if (name.length === 0){
        $('#inputEditName').next().show();
        $('#inputEditName').next().html("Inserisci un nome valido");
    }
    else {
        networkManager.setProfile(
            name, 
            null, 
            (response) => {
                $('#inputEditName').next().html("");
                $('#inputEditName').next().hide();
                modalEditName.hide();
                profile.name = name;
                localStorage.setItem("profile", JSON.stringify(profile));
                profile = JSON.parse(localStorage.getItem("profile"));
                showProfileName();
            }, error => {
                $('#inputEditName').next().show();
                $('#inputEditName').next().html("Nome inserito non disponibile");
            });
    }
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