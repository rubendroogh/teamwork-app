export interface IUser {
    uid: string
    name: string
    number: string
    teams: Array<any>
}

export default class UserService {
    private user: IUser
    private firebase: any
    private userDoc: any

    /**
     * @description Create new instance
     * 
     * @author rubendroogh
     * 
     * @this {UserService}
     * @param uid {string}
     * @param number {string}
     * @param firebaseRef {any}
     */
    constructor(firebaseRef: any) {
        this.firebase = firebaseRef
    }

    /**
     * @description Load data with uid, load user from Firestore or creates new document.
     * 
     * @param uid {string}
     * @param number {string}
     * @returns Promise<IUser>
     */
    public loadWithUid(uid: string, number: string): Promise<IUser> {
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
                    this.user = doc.data()
                    resolve(this.user)
                } else {    
                    let userCollection = this.firebase.firestore.collection('users')
                    userCollection.doc(this.user.uid).set({
                        name: '',
                        number: number,
                        teams: []
                    })
                    this.userDoc = userCollection.doc(this.user.uid)
                    resolve(this.user)
                }
            })
        })
    }

    /**
     * @returns name {string}
     */
    public getName(): string {
        return this.user.name
    }

    /**
     * @returns uid {string}
     */
    public getUid(): string {
        return this.user.uid
    }

    /**
     * @returns teams {Array<any>}
     */
    public getTeams(): Array<any> {
        return this.user.teams
    }

    /**
     * @returns userRef {any}
     */
    public getUserDoc(): any {
        return this.userDoc
    }

    /**
     * @description Set new name and update in Firestore
     * 
     * @param name {string}
     */
    public setName(name: string): void {
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
    public addTeam(teamRef: any): void {
        this.user.teams.push(teamRef)

        this.userDoc.update({
            teams: this.user.teams
        })
    }
}