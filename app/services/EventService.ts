export interface IEvent{
    name: string
    addedBy: any //user ref
    description?: string
    location?: string
    cost?: number
    costPerPerson?: boolean
    date: number
}