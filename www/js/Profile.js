
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
        $("#imageProfile").attr("src", "img/logo.png");
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

function openFilePicker() {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptionsGallery(srcType);

    navigator.camera.getPicture(
        (image) => {
            if (image.substr(0,5) === "file:"){
                getFileContentAsBase64(image, (base64)=>{
                    console.log(base64);
                    setProfilePicture(base64);
                });
            } 
            else {
                console.log("Immagine caricata: " + image);
                setProfilePicture(image);
            }
        }, 
        (error) => console.error("impossibile ottenere l'immagine: ", error),
        options);
}

function setOptionsGallery(srcType) {
    let options = {
        quality: 30,
        targetHeight: 200,
        targetWidth: 200,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    }
    return options;
}

function getFileContentAsBase64(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);   
    function fail(e) {
        alert('file non trovato');
    }
    function gotFile(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                var content = this.result;
                callback(content.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
            };
            reader.readAsDataURL(file);
        });
    }
}