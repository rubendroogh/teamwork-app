/** Possible options:
 *    - name (string): set team name
 *    - members (array of strings): set team members
 */
export interface ITeamOptions {
    name?: string
    members?: Array<any>
}

export interface ITeam {
    id: string
    name: string
    members?: Array<any>
}

export default class TeamService {
    team: ITeam
    firebase: any
    teamDoc: any

    // TODO: load existing team
    /**
     * @description Create new instance
     * 
     * @author rubendroogh
     * 
     * @this {TeamService}
     * @param firebaseRef {any}
     */
    constructor(firebaseRef: any) {
        this.team = {
            id: '',
            name: '',
            members: []
        }
        this.firebase = firebaseRef
    }

    /**
     * @description creates new team in database using provided options
     * 
     * @param options {ITeamOptions}
     * @returns Promise<void>
     */
    public init(options: ITeamOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            let teamData = {
                name: options.name ? options.name : 'A new team',
                members: []
            }
    
            let teamCollection = this.firebase.firestore.collection('teams')
            teamCollection.add(teamData).then(
                docRef => {
                    this.teamDoc = teamCollection.doc(docRef.id)
                    this.team.id = docRef.id
                    
                    docRef.get().then(doc => {
                        this.team.name = doc.data().name
                    })
    
                    if(options.members) {
                        this.addMembers(options.members).then(() => {
                            resolve()
                        })
                    }
                }
            )
        })
    }

    /**
     * @returns string
     */
    public getId(): string {
        return this.team.id
    }

    /**
     * @returns string
     */
    public getName(): string {
        return this.team.name
    }

    /**
     * @returns Array<any>
     */
    public getMembers(): Array<any> {
        return this.team.members
    }

    /**
     * @returns any
     */
    public getReferenceDoc(): any {
        return this.teamDoc
    }

    /** 
     * @param name {string}
     */
    public setName(name: string): void {
        this.team.name = name

        try {
            this.teamDoc.update({
                name: this.team.name
            })
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * @description add an array of members to team
     * @todo add check for valid UID
     * 
     * @param uids {Array<string>}
     * @returns Promise<Array<any>>
     */
    public addMembers(uids: Array<string>): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            // Create array of references to users
            const usersCollection: any = this.firebase.firestore.collection('users')
            const newMembers: Array<any> = uids.map(uid => usersCollection.doc(uid))

            let userTeamDocs: Array<any> = [this.teamDoc]

            // Add team reference to teams field in user doc
            // Team duplication check should be done on front end
            newMembers.forEach(memberDoc => {
                memberDoc.get().then(doc => {
                    if (doc.exists) {
                        // If user already has team(s), add the team doc to the list
                        if(doc.data().teams) {
                            doc.data().teams.push(this.teamDoc)
                            userTeamDocs = doc.data().teams
                        }

                        // Push data to Firestore
                        memberDoc.update({
                            teams: userTeamDocs
                        })
                    }
                })
            })

            // Join members array
            this.team.members = (this.team.members) ? this.team.members.concat(newMembers) : newMembers

            // Update data to team in Firestore
            this.teamDoc.update({
                members: this.team.members
            }).then(() => {
                resolve(this.team.members)
            })
        })
    }

    // TODO: add function to sync service to database.
}