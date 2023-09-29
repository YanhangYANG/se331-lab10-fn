export interface EventItem {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: EventOrganizer | string
}

export interface EventOrganizer {
    id: number
    name: string
}


export interface StudentItem {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  image: string
  penAmount: number
  description: string
}

export interface OrgItem {
    id: number
    name: string
    address: string

}

export interface AuctionItem{
    id: number
    description: string
    type: string
}

export interface BidItem{
    id: number
    amount: number
    datetime: string
}
