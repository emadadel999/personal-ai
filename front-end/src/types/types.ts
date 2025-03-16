enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface Message {
    id: string   
    type: 'q' | 'a'
    content?: string
    thinkContent?: string
}
export interface Room {
    roomName: string
    messages: Message[]
    roomType?: string
}
export interface User {
    id: string
    username: string
    roomname: string
    isOnline?: boolean
    role?: Role     
}