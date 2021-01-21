
function openFilePicker(options, onImageRetrieved) {
    navigator.camera.getPicture(
        (image) => {
            if (window.cordova.platformId === "android"){
                if (!image.substr(0,4) === "file:"){
                    image = "file://" + image;
                }
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


// NON funziona:
// function isBase64(str){
//     if (str.substr(str.length-1, 1) === "\n"){
//         str = str.substr(0, str.length-1);
//     }
//     const notBase64 = /[^A-Z0-9+\/=]/i;
//     const len = str.length;
//     if (!len || len % 4 !== 0 || notBase64.test(str)) {
//         return false;
//     }
//     const firstPaddingChar = str.indexOf('=');
//     return firstPaddingChar === -1 ||
//         firstPaddingChar === len - 1 ||
//         (firstPaddingChar === len - 2 && str[len - 1] === '=');
    // let regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/; return regex.test(str);
    // try {
    //     return btoa(atob(str)) == str;
    // } catch (err) {
    //     return false;
    // }
// }