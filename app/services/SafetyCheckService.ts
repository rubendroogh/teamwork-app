interface ISafetyCheck {
    results: Array<ISafetyCheckResult>
    createdAt: number,
    isActive: boolean,
    expectedResults: number
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
            isActive: true,
            expectedResults: 0
        }
    }

    /**
     * addToTeam
     * 
     * @description adds a new safety check to a team and sets it to active
     */
    public addToTeam() {    
        this.teamRef.get().then(doc => {
            this.safetyCheck.expectedResults = doc.data().members.length
            let safetyChecks = [this.safetyCheck]
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
     * @description promises current active safety check
     * 
     * @returns Promise<ISafetyCheck>
     */
    public getActive(): Promise<ISafetyCheck> {
        return new Promise((resolve, reject) => {
            this.teamRef.get().then(doc => {
                let activeCheck = null
                doc.data().safetyChecks.forEach(check => {
                    (check.isActive === true) ? activeCheck = check : ''
                })
                if(activeCheck != null) {
                    resolve(activeCheck)
                } else{
                    reject('No active safety check found.')
                }
            })
        })
        
    }

    /**
     * getByKey
     * 
     * @description returns safety check info by array key
     * 
     * @returns Promise<ISafetyCheck> | Promise<string>
     */
    public getByKey(key: number): any {
        return new Promise((resolve, reject) => {
            this.teamRef.get().then(teamDoc => {
                if (teamDoc.data().safetyChecks[key]) {
                    resolve(teamDoc.data().safetyChecks[key])
                } else{
                    reject('No safety check found at that index')
                }
            })
        })
    }

    /**
     * getAllFromTeam
     * 
     * @description get all safety checks from current team
     * 
     * @returns Promise<Array<any>> | Promise<string>
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