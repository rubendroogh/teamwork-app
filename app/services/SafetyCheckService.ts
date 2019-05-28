interface ISafetyCheck {
    results: Array<ISafetyCheckResult>
    createdAt: number,
    isActive: boolean
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
            createdAt: Date.now(),
            isActive: true
        }
    }

    /**
     * addToTeam
     * 
     * @description adds a new safety check to a team and sets it to active
     */
    public addToTeam() {
        let safetyChecks = [this.safetyCheck]

        this.teamRef.get().then(doc => {
            // If user already has safety checks, add the check to the list and sets all others to non-active
            if(doc.data().safetyChecks) {
                safetyChecks = doc.data().safetyChecks.map(check => {
                    let rCheck = check
                    rCheck.isActive = false
                    return rCheck
                })
                safetyChecks.push(this.safetyCheck)
            }

            // Push data to Firestore
            this.teamRef.update({
                safetyChecks: safetyChecks
            })
        })
    }

    /**
     * getActive
     * 
     * @description returns current active safety check
     * 
     * @returns ISafetyCheck
     */
    public getActive(): ISafetyCheck {
        
    }

    /**
     * getByKey
     * 
     * @description returns safety check info by array key
     * 
     * @returns ISafetyCheck
     */
    public getByKey(key: number): ISafetyCheck {
        
    }

    /**
     * getAllFromTeam
     * 
     * @description get all safety checks from current team
     * 
     * @returns Promise<Array<any>>
     */
    public getAllFromTeam(): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            this.teamRef.get().then(teamDoc => {
                if (teamDoc.data().safetyChecks) {
                    resolve(teamDoc.data().safetyChecks)
                } else{
                    reject('No safety checks found')
                }
            })
        })
    }
}