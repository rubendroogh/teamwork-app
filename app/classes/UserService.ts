// const firebase = require("nativescript-plugin-firebase")

interface IUser {
    uid: string
    name: string
    teams: Array<string>
}

export default class UserService implements IUser {
    uid: string
    name: string
    teams: Array<string>
    firebase: any

    constructor(uid: string, firebaseRef: any){
        this.uid = uid
        this.firebase = firebaseRef

        
    }

    public getName(){
        return this.name
    }

    public getUid(){
        return this.uid
    }

    public getTeams(){
        return this.teams
    }

    public setUid(uid: string){
        this.uid = uid
    }

    public setFirebaseRef(firebase: any){
        this.firebase = firebase
    }
}