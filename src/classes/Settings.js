class Settings{
    constructor(){
        var self = this;
        if(!self.checkIfStorageAvailable()){
            return false;
        }

        self.prepend = "battle_eye_";
        self.fields = [];
    }

    set(field, value){
        var self = this;
        localStorage.setItem(`${self.prepend}${field}`, value);
    }

    get(field){
        var self = this;
        var val = localStorage.getItem(`${self.prepend}${field}`);

        switch(val){
            case 'true':
                val = true;
                break;
            case 'false':
                val = false;
                break;
        }

        return val;
    }

    has(field){
        var self = this;
        if(localStorage.getItem(`${self.prepend}${field}`)){
            return true;
        }

        return false;
    }

    define(field, value){
        var self = this;

        if(self.fields.indexOf(field) == -1){
            self.fields.push(field);
        }

        if(!self.has(field)){
            self.set(field, value);
        }
    }

    getAll(){
        var self = this;

        var object = {};

        for(var i in self.fields){
            var f = self.fields[i];
            object[f] = self.get(f);
        }

        return object;
    }

    checkIfStorageAvailable(){
        return (typeof(Storage) !== "undefined");
    }
}