import {IUser} from './UserService'
import {ISafetyCheck} from './SafetyCheckService'
import {IEvent} from './EventService'
import {ITestResults} from './TeamTestService'

export interface IMeeting{
    agendaItems: Array<IAgendaItem>
    startTime: number
    subject: string
    purpose: string
    leader: any //user ref
    secretary: any //user ref
}

export interface IAgendaItem{
    description: string
    addedBy: any //user ref
    reference?: ISafetyCheck | IEvent | ITestResults
}

export default class MeetingService {
    private meeting: IMeeting
    private teamRef: any
    private firebase: any

    /**
     * @description Create new instance
     * 
     * @author rubendroogh
     * 
     * @this {MeetingService}
     * @param firebaseRef {any}
     * @param teamRef {any}
     */
    constructor(firebaseRef: any, teamRef: any) {
        this.teamRef = teamRef
        this.firebase = firebaseRef
        
        this.meeting = {
            agendaItems: [],
            startTime: 0,
            subject: '',
            purpose: '',
            leader: {},
            secretary: {}
        }
    }

    /**
     * create
     * 
     * @description adds a new safety check to a team and sets it to active
     * @returns Promise<IMeeting>
     */
    public create(newMeeting: IMeeting): Promise<IMeeting> {
        this.meeting = newMeeting

        return new Promise((resolve, reject) => {
            this.teamRef.get().then(doc => {
                let meetings: Array<any> = [this.meeting]

                if(doc.data().meetings) {
                    meetings = doc.data().meetings
                    meetings.push(this.meeting)
                }
    
                // Push data to Firestore
                this.teamRef.update({
                    meetings: meetings
                })
                resolve(this.meeting)
            })
        })
    }

    /**
     * getAllFromTeam
     * 
     * @description get all meetings from current team
     * 
     * @returns Promise<Array<IMeeting>>
     */
    public getAllFromTeam(): Promise<Array<IMeeting>> {
        return new Promise((resolve, reject) => {
            this.teamRef.get().then(teamDoc => {
                if (teamDoc.data().meetings) {
                    resolve(teamDoc.data().meetings)
                } else{
                    reject('No meetings found')
                }
            })
        })
    }

}
// TODO: validation