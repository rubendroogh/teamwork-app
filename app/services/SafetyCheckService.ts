export interface ISafetyCheck {
    results: Array<ISafetyCheckResult>
    createdAt: number
    isActive: boolean
    expectedResults: number
    key?: number
}

export interface ISafetyCheckResult {
    userRef: any
    value: number
}

export default class SafetyCheckService {
    private safetyCheck: ISafetyCheck
    private teamRef: any
    private firebase: any
    
    /**
     * @description Create new instance
     * 
     * @author rubendroogh
     * 
     * @this {SafetyCheckService}
     * @param firebaseRef {any}
     * @param teamRef {any}
     */
    constructor(firebaseRef: any, teamRef: any) {
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
     * addNewToTeam
     * 
     * @description adds a new safety check to a team and sets it to active
     * @returns Promise<ISafetyCheck>
     */
    public addNewToTeam(): Promise<ISafetyCheck> {
        return new Promise((resolve, reject) => {
            this.teamRef.get().then(doc => {
                this.safetyCheck.expectedResults = doc.data().members.length
                let safetyChecks: Array<any> = [this.safetyCheck]
                // If user already has safety checks, add the check to the list and sets all others to non-active
                if(doc.data().safetyChecks) {
                    safetyChecks = doc.data().safetyChecks.map(check => {
                        let rCheck: ISafetyCheck = check
                        rCheck.isActive = false
                        return rCheck
                    })
                    safetyChecks.push(this.safetyCheck)
                }
    
                // Push data to Firestore
                this.teamRef.update({
                    safetyChecks: safetyChecks
                })
                resolve(this.safetyCheck)
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
                let activeCheck: null | ISafetyCheck = null
                doc.data().safetyChecks.forEach((check, index) => {
                    if (check.isActive === true) {
                        activeCheck = check
                        activeCheck.key = index
                    }
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
     * @returns Promise<ISafetyCheck>
     */
    public getByKey(key: number): Promise<ISafetyCheck> {
        return new Promise((resolve, reject) => {
            this.getAllFromTeam().then(checks => {
                (checks[key]) ? resolve(checks[key]) :  reject('No safety check found at that index')
            }, error => {
                reject('No safety check found at that index')
            })
        })
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

    /**
     * addResult
     * 
     * @description add result to safety check
     * 
     * @param newResult {ISafetyCheckResult}
     * @param key {number}
     * @returns message Promise<string>
     */
    public addResult(newResult: ISafetyCheckResult, timestamp: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this.teamRef.get().then(teamDoc => {
                // Get index and data of needed safety check
                let safetyCheckIndex = teamDoc.data().safetyChecks.findIndex(check => { return check.createdAt == timestamp })
                let safetyCheck = teamDoc.data().safetyChecks.find(check => { return check.createdAt == timestamp })

                if (safetyCheck) {
                    let safetyChecks: Array<ISafetyCheck> = teamDoc.data().safetyChecks
                    let userHasResult: boolean = false
    
                    // Check if user already posted a result to this check
                    safetyChecks[safetyCheckIndex].results.forEach(result => {
                        (result.userRef === newResult.userRef) ? userHasResult = true : ''
                    })
    
                    if (!userHasResult) {
                        // Add result to array and save to database
                        safetyChecks[safetyCheckIndex].results.push(newResult)
                        this.teamRef.update({
                            safetyChecks: safetyChecks
                        })
                        resolve('Bedankt! Het resultaat is ontvangen.')
                    }
                }
            })
        })
    }
}