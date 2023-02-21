export type NewUser = {
    username: string,
    age: number,
    hobbies: string[]
}

export type User = NewUser & {
    id: string, // TODO: uuid type
}

export type Store = {
    [key: string]: User // TODO uuid type + key and id should be same, try generics
}