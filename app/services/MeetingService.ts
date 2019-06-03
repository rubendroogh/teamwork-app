import {IUser} from './UserService'

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
    addedBy: IUser
}