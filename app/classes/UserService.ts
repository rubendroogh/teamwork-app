interface IUser {
    uid: string
    name: string
    teams: Array<string>
}

export default class UserService {
    user: IUser
    firebase: any
    userDoc: any

    /**
     * @description Create new instance
     * 
     * @author rubendroogh
     * 
     * @this {UserService}
     * @param uid {string}
     * @param firebaseRef {any}
     */
    constructor(uid: string, firebaseRef: any) {
        this.firebase = firebaseRef

        if (uid !== '') this.loadWithUid(uid)
    }

    /**
     * @description Load data with uid, load user from Firestore or creates new document.
     * 
     * @param uid 
     */
    public loadWithUid(uid: string) {
        this.user = {
            uid: uid,
            name: '',
            teams: []
        }

        this.userDoc = this.firebase.firestore.collection("users").doc(uid)

        this.userDoc.get().then(doc => {
            if (doc.exists) {
                // Get data from Firestore
                this.user.name = doc.data().name
                this.user.teams = doc.data().teams
            } else {
                // Create document in Firestore
                let emptyData = {
                    name: '',
                    teams: []
                }

                let userCollection = this.firebase.firestore.collection('users')
                userCollection.doc(this.user.uid).set(emptyData)
                this.userDoc = userCollection.doc(this.user.uid)
            }
        })
    }

    /**
     * @returns name {string}
     */
    public getName() {
        return this.user.name
    }

    /**
     * @returns uid {string}
     */
    public getUid() {
        return this.user.uid
    }

    /**
     * @returns teams {Array<string>}
     */
    public getTeams() {
        return this.user.teams
    }

    /**
     * @description Set new name and update in Firestore
     * 
     * @param name {string}
     */
    public setName(name: string) {
        this.user.name = name

        this.userDoc.update({
            name: this.user.name
        })
    }

    /**
     * @description Add team and update in Firestore
     * 
     * @param teamId {string}
     */
    public addTeam(teamId: string) {
        this.user.teams.push(`/teams/${teamId}`)

        this.userDoc.update({
            teams: this.user.teams
        })
    }
}