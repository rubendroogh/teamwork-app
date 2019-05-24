/** Possible options:
 *    - name (string): set team name
 *    - members (array of strings): set team members
 */
interface ITeamOptions {
    name?: string
    members?: Array<string>
}

export interface ITeam {
    id: string
    name: string
    members?: Array<string>
}

export default class TeamService {
    team: ITeam
    firebase: any
    teamDoc: any

    // TODO: load existing team
    constructor(firebaseRef: any) {
        this.team = {
            id: '',
            name: '',
            members: []
        }
        this.firebase = firebaseRef
    }

    public init(options: ITeamOptions) {
        return new Promise((resolve, reject) => {
            let teamData = {
                name: options.name ? options.name : 'A new team',
                members: []
            }
    
            // Create document in firestore
            let teamCollection = this.firebase.firestore.collection('teams')
    
            teamCollection.add(teamData).then(
                docRef => {
                    console.dir(docRef.get())
                    this.teamDoc = teamCollection.doc(docRef.id)
                    this.team.id = docRef.id
                    
                    docRef.get().then(doc => {
                        this.team.name = doc.data().name
                    })
    
                    // Done with the function because extra operations have to be made
                    if(options.members) {
                        this.addMembers(options.members).then(() => {
                            resolve()
                        })
                    }
                }
            )
        })
    }

    public getId() {
        return this.team.id
    }

    public getName() {
        return this.team.name
    }

    public getMembers() {
        return this.team.members
    }

    public getReferenceDoc() {
        return this.teamDoc
    }

    public setName(name: string) {
        this.team.name = name

        try {
            this.teamDoc.update({
                name: this.team.name
            })
        } catch (e) {
            console.log(e)
        }
    }

    public addMembers(uids: Array<string>) {
        return new Promise((resolve, reject) => {
            // Create array of references to users
            const usersCollection = this.firebase.firestore.collection('users')
            const newMembers = uids.map(uid => usersCollection.doc(uid))

            let userTeamDocs = [this.teamDoc]

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

    // TODO: add check for correct UID
    public addMember(uid: string) {
        this.team.members.push(`/users/${uid}`)

        this.teamDoc.update({
            members: this.team.members
        }).then(() => {
            return this.team.members
        })
    }

    // TODO: add function to sync service to database.
}