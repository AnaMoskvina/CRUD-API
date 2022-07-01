import crypto from 'crypto'
import { Store, User, NewUser } from './types'

class DB {
    private store: Store

    constructor() {
        this.store = {}
    }

    getUsers(): User[] {
        return Object.values(this.store)
    }

    getUser(id: string): User | null {
        return this.store[id] ? this.store[id] : null
    }

    postUser(user: NewUser): User {
        const uuid = crypto.randomUUID({disableEntropyCache : true})
        const createdUser = {
            ...user,
            id: uuid
        }
        this.store[uuid] = createdUser
        return createdUser
    }

    deleteUser(id: string) {
        delete this.store[id]
    }

    putUser(id: string, user: User) {
        const updatedUser = {
            ...this.store[id],
            ...user
        }
        this.store[id] = updatedUser
        return updatedUser
    }
}

export const db = new DB()