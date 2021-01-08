class Profile{
    constructor(varProfile){
        this._NetworkMenager = new NetworkManager();
        this._varProfile = varProfile;
    }

    setName(){
        // if (typeof(this._varProfile.name) != 'undefined') {
            
        // } else {
            
        // }
    }

    getImage(){
        // let profile = JSON.parse(this._varProfile);
        // if (typeof(profile.picture) != 'undefined') {
        //     let picture = profile.picture;
        //     $('#imageProfile img:last-child').remove();
        //     $('#imageProfile').append('<img src="data:image/png;base64,' + picture + '" alt="image_prifile">');

        // } else {
        //     $('#imageProfile').append('<img src="img/logo.png" alt="image_profile"></img>');
        // }
        $('#imageProfile').append('<img src="img/logo.png" alt="image_profile"></img>');
    }







}