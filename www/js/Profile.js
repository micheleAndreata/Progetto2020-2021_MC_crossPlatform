var networkManager = new NetworkManager();
var dataProfile = JSON.parse(localStorage.getItem("profile"));


// PICTURE
function getPictureProfile(){
    if (typeof(dataProfile.picture) != 'undefined') {
        let picture = dataProfile.picture;
        // $('#imageProfile img:last-child').remove();
        // $('#imageProfile').append('<img src="data:image/png;base64,' + picture + '" alt="image_prifile">');
        $("#imageProfile").attr("src", "data:image/jpeg;base64, " + picture);

    } else {
        $("#imageProfile").attr("src", "img/logo.png");
    }
}

function setPrictureProfile(picture) {
    networkManager.setProfile(profile.name, picture, (response) => {
        profile.picture = picture;
        localStorage.setItem("profile", JSON.stringify(profile));
        dataProfile = JSON.parse(localStorage.getItem("profile"));
        getPictureProfile();
    });
}

// NAME
function getNameProfile(){
    if (typeof(dataProfile.name) != 'undefined') {
        let name = dataProfile.name;
        $('#nameProfile h3:last-child').remove();
        $('#nameProfile').append('<h3>' + name + '</h3>');

    } else {
        $('#nameProfile').append('<p class="alert alert-danger">Nessun nome inserito</p>');
    }
}
function setNameProfile() {
    let modalEditName = bootstrap.Modal.getInstance(document.getElementById('modalEditName'));
    let name = $('#inputEditName').val();
    modalEditName.hide();
    networkManager.setProfile(name, null, (response) => {
        profile.name = name;
        localStorage.setItem("profile", JSON.stringify(profile));
        dataProfile = JSON.parse(localStorage.getItem("profile"));
        getNameProfile();
    });
}




function setOptionsGalley(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        //Usate FILE_URI al posto di FILE_URL per evitare molti problemi di gestione della memoria.
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function openFilePicker() {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptionsGalley(srcType);


    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something
        console.log("Immagine caricata: "+ imageUri);
        setPrictureProfile(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}