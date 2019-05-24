interface ISafetyCheck {
    results: Array<ISafetyCheckResult>
    createdAt: number
}

interface ISafetyCheckResult {
    userRef: any
    value: number
}

export default class SafetyCheckService {
    safetyCheck: ISafetyCheck
    teamRef: any
    firebase: any
    
    constructor(firebaseRef, teamRef) {
        this.teamRef = teamRef
        this.firebase = firebaseRef
        
        this.safetyCheck = {
            results: [],
            createdAt: Date.now()
        }

        console.dir(this.safetyCheck)
        this.addToTeam()
    }

    /**
     * saveToDatabase
     */
    public addToTeam() {
        let safetyChecks = [this.safetyCheck]

        this.teamRef.get().then(doc => {
            // If user already has safety checks, add the check to the list
            if(doc.data().safetyChecks) {
                doc.data().safetyChecks.push(this.safetyCheck)
                safetyChecks = doc.data().safetyChecks
            }

            // Push data to Firestore
            this.teamRef.update({
                safetyChecks: safetyChecks
            })
        })
    }

    /**
     * getByKey
     */
    public getByKey(key: number) {
        
    }
}