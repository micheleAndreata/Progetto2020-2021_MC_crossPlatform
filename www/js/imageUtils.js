
function isBase64(str){
    let regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return regex.test(str);
}

function openFilePicker(options, onImageRetrieved) {
    navigator.camera.getPicture(
        (image) => {
            if (window.cordova.platformId === "android"){
                getFileContentAsBase64(image, (base64)=>{
                    console.log(base64);
                    onImageRetrieved(base64);
                });
            } 
            else {
                console.log("Immagine caricata: " + image);
                onImageRetrieved(image);
            }
        }, 
        (error) => console.error("impossibile ottenere l'immagine: ", error),
        options);
}


function getFileContentAsBase64(path,callback){
    console.log(path);
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