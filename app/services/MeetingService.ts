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

// TODO: validation