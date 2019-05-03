interface IUser {
    uid: string
    name: string
    teams: Array<string>
}

export default class UserService implements IUser {
    uid: string
    name: string
    teams: Array<string>

    constructor(uid: string){
        this.uid = uid
    }

    getName(){

    }

    getUID(){

    }

    getTeams(){

    }

    setName(){
        
    }
}