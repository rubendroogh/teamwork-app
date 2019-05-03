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
    userDoc: any

    constructor(uid: string, firebaseRef: any){
        this.uid = uid
        this.firebase = firebaseRef

        let data = {
            name: '',
            teams: []
        }

        // Create document in firestore
        this.userDoc = this.firebase.firestore.collection('users').doc(this.uid).set(data)
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

    public setName(name: string){
        this.name = name


    }

    public setUid(uid: string){
        this.uid = uid
    }

    public setFirebaseRef(firebase: any){
        this.firebase = firebase
    }
}