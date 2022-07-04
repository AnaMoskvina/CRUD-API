import crypto from 'crypto'
import { Store, User, NewUser } from './types'

const store: Store = {}

class UserRepository {

    getUsers(): Promise<User[]> {
        return Promise.resolve(Object.values(store))
    }

    getUser(id: string): Promise<User> | Promise<null> {
        return Promise.resolve(store[id] ? store[id] : null)
    }

    postUser(user: NewUser): Promise<User> {
        const uuid = crypto.randomUUID({disableEntropyCache : true})
        const createdUser = {
            ...user,
            id: uuid
        }
        store[uuid] = createdUser
        return Promise.resolve(createdUser)
    }

    deleteUser(id: string): Promise<null> {
        delete store[id]
        return Promise.resolve(null)
    }

    putUser(id: string, user: Partial<User>): Promise<User> {
        const updatedUser = {
            ...store[id],
            ...user
        }
        store[id] = updatedUser
        return Promise.resolve(updatedUser)
    }
}

export const userRepository = new UserRepository()