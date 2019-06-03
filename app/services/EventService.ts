export interface IEvent{
    name: string
    createdAt: number
    addedBy: any //user ref
    description?: string
    location?: string
    cost?: number
    costPerPerson?: boolean
    date: number
}