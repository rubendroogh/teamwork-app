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
        let userCollection = this.firebase.firestore.collection('users')
        userCollection.doc(this.uid).set(data)
        this.userDoc = userCollection.doc(this.uid)
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

        this.userDoc.update({
            name: this.name
        })
    }

    public addTeam(teamId: string){
        this.teams.push(`/teams/${teamId}`)

        this.userDoc.update({
            teams: this.teams
        })
    }
}