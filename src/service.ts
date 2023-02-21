import { validate } from 'uuid'
import { userRepository } from './userRepository'
import { ERROR_MESSAGES, ValidationError, NotFoundError } from './constants'
import { User, NewUser } from './types'


const getIsIdExist = async (id: string) => {
    const users = await userRepository.getUsers()
    return !!users.find(user => user.id === id)
}

const getIsPostBodyValid = body => {
    const { hobbies, username, age } = body
    return Object.keys(body).length === 3 
        && username && age && hobbies
        && typeof username === 'string'
        && typeof age === 'number'
        && Array.isArray(hobbies)
        && hobbies.every(hobbie => typeof hobbie === 'string')
}

const getIsPutBodyValid = body => {
    const validFieldNames = ['username', 'age', 'hobbies'] // TODO: where its better to place?
    let areKeysValid = true
    Object.keys(body).forEach(key => {
        if (!validFieldNames.includes(key)) areKeysValid = false
    })
    const { hobbies, username, age } = body
    return Object.keys(body).length <= 3 
        && (typeof username === 'string' || typeof username === 'undefined')
        && (typeof age === 'number' || typeof username === 'undefined')
        && ((Array.isArray(hobbies) &&  hobbies.every(hobbie => typeof hobbie === 'string')) || typeof hobbies === 'undefined')
        && areKeysValid
}


class Service {
    async get(id?: string) {
        if (!id) {
            return await userRepository.getUsers()
        } else {
            if (!validate(id)) {
                throw new ValidationError(ERROR_MESSAGES.INVALID_ID)
            } else if (!getIsIdExist(id)) {
                throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND)
            } else {
                return await userRepository.getUser(id)
            }
        }
    }

    async post(newUser: NewUser) {
        if (!getIsPostBodyValid(newUser)) {
            throw new ValidationError(ERROR_MESSAGES.INVALID_BODY)
        } else {
            return await userRepository.postUser(newUser)
        }
    }

    async put(id: string, user: Partial<User>) {
        if (!id) {
            throw new NotFoundError(ERROR_MESSAGES.INVALID_URL)
        } else if (!validate(id)) {
            throw new ValidationError(ERROR_MESSAGES.INVALID_ID)
        } else if (!getIsIdExist(id)) {
            throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND)
        } else if (!getIsPutBodyValid(user)) {
            throw new ValidationError(ERROR_MESSAGES.INVALID_BODY)
        } else {
            return await userRepository.putUser(id, user)
        }
    }

    async delete(id: string) {
        if (!id) {
            throw new NotFoundError(ERROR_MESSAGES.INVALID_URL)
        } else if (!validate(id)) {
            throw new ValidationError(ERROR_MESSAGES.INVALID_ID)
        } else if (!getIsIdExist(id)) {
            throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND)
        } else {
            await userRepository.deleteUser(id)
        } 
    }
}

export const service = new Service()