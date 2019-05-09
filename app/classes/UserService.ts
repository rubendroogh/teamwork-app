interface IUser {
    uid: string
    name: string
    number: string
    teams: Array<any>
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
    constructor(uid: string, number: string, firebaseRef: any) {
        this.firebase = firebaseRef

        if (uid !== '' && number !== '') this.loadWithUid(uid, number)
    }

    /**
     * @description Load data with uid, load user from Firestore or creates new document.
     * 
     * @param uid {string}
     * @param number {string}
     * @returns Promise<IUser>
     */
    public loadWithUid(uid: string, number: string) {
        return new Promise((resolve, reject) => {
            this.user = {
                uid: uid,
                name: '',
                number: number,
                teams: []
            }
    
            this.userDoc = this.firebase.firestore.collection("users").doc(uid)
    
            this.userDoc.get().then(doc => {
                if (doc.exists) {
                    // Get data from Firestore
                    this.user.name = doc.data().name
                    this.user.number = doc.data().number
                    this.user.teams = doc.data().teams
                    resolve(this.user)
                } else {
                    // Create document in Firestore
                    let emptyData = {
                        name: '',
                        number: number,
                        teams: []
                    }
    
                    let userCollection = this.firebase.firestore.collection('users')
                    userCollection.doc(this.user.uid).set(emptyData)
                    this.userDoc = userCollection.doc(this.user.uid)
                    resolve(this.user)
                }
            })
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
     * @param teamRef {any}
     */
    public addTeam(teamRef: any) {
        this.user.teams.push(teamRef)

        this.userDoc.update({
            teams: this.user.teams
        })
    }
}