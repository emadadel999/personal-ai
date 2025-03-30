export interface Message {
    id: string   
    type: 'q' | 'a'
    content?: string
    thinkContent?: string
}