class Model {
    static _instance = null;
    static getInsance(){
        if (Model._instance == null)
            Model._instance = new Model();
        return Model._instance;
    }
    constructor(){
        this._networkManager = new networkManager();
        this._channel = new Array();
    }
}