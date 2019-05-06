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
        let usersCollection = this.firebase.firestore.collection('users')
        let newMembers = uids.map(uid => usersCollection.doc(uid))

        // Join members array
        this.members = (this.members) ? this.members.concat(newMembers) : newMembers

        // Update data in Firestore
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
}