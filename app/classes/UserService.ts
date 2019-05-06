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

    // TODO: check if user exists(?) if so, load that one
    constructor(uid: string, firebaseRef: any){
        this.uid = uid
        this.firebase = firebaseRef

        let data = {
            name: '',
            teams: []
        }
        
        this.userDoc = this.firebase.firestore.collection("users").doc(uid);

        this.userDoc.get().then(doc => {
            if (doc.exists) {
                // Get data from Firestore
                this.name = doc.data().name
                this.teams = doc.data().teams
            } else {
                // Create document in Firestore
                let userCollection = this.firebase.firestore.collection('users')
                userCollection.doc(this.uid).set(data)
                this.userDoc = userCollection.doc(this.uid)
            }
        })
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