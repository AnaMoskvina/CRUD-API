import crypto from 'crypto'
import { Store, User, NewUser } from './types'

const store: Store = {}

class UserRepository {

    getUsers(): User[] {
        return Object.values(store)
    }

    getUser(id: string): User | null {
        return store[id] ? store[id] : null
    }

    postUser(user: NewUser): User {
        const uuid = crypto.randomUUID({disableEntropyCache : true})
        const createdUser = {
            ...user,
            id: uuid
        }
        store[uuid] = createdUser
        return createdUser
    }

    deleteUser(id: string) {
        delete store[id]
    }

    putUser(id: string, user: Partial<User>) {
        const updatedUser = {
            ...store[id],
            ...user
        }
        store[id] = updatedUser
        return updatedUser
    }
}

export const userRepository = new UserRepository()