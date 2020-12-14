class Persona{
    constructor(nome, cognome){
        this._nome = nome;
        this._cognome = cognome;
    };
    getNome(){return this._nome};
    getCognome(){return this._cognome};

    setNome(newNome){
        if (newNome == "" || newNome == null) {
            console.error("Errore nel inserimento del nome, non può essere null o vuoto!");
        }else{this._nome = newNome;}
    }
    setCognome(newCognome){
        if (newCognome == "" || newCognome == null) {
            console.error("Errore nel inserimento del cognome, non può essere null o vuoto!");
        }else{this._cognome = newCognome;}
    }
    println(){
        console.log(this._nome, this._cognome);
    }
}