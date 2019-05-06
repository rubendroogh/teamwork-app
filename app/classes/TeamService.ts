/** Possible options:
 *    - name (string): directly set team name
 *    - members (array of strings): directly set team members
 */
interface ITeamOptions {
    name?: string
    members?: Array<string>
}

export default class TeamService{
    id: string
    name: string
    members: Array<string>
    firebase: any
    teamDoc: any

    // TODO: check if team exists(?) if so, load that one
    constructor(firebaseRef: any, options?: ITeamOptions){
        this.firebase = firebaseRef

        let teamData = {
            name: options.name ? options.name : 'A new team',
            members: []
        }

        // Create document in firestore
        let teamCollection = this.firebase.firestore.collection('teams')

        teamCollection.add(teamData).then((doc) => {
            this.teamDoc = teamCollection.doc(doc.id)

            // Done with the function because extra operations have to be made
            if(options.members) {
                this.addMembers(options.members)
            }
        })
    }

    public getName(){
        return this.name
    }

    public getMembers(){
        return this.members
    }

    public setName(name: string){
        this.name = name

        try {
            this.teamDoc.update({
                name: this.name
            })
        } catch (e) {
            console.log(e)
        }
    }

    // TODO: add check for correct UID
    public addMembers(uids: Array<string>) {
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
                    console.dir(doc.data().teams)
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
        this.members = (this.members) ? this.members.concat(newMembers) : newMembers

        // Update data to team in Firestore
        this.teamDoc.update({
            members: this.members
        }).then(() => {
            return this.members
        })
    }

    // TODO: add check for correct UID
    public addMember(uid: string){
        this.members.push(`/users/${uid}`)

        this.teamDoc.update({
            members: this.members
        }).then(() => {
            return this.members
        })
    }

    // TODO: add function to sync service to database.
}