import { userRepository } from './userRepository'
import { validate } from 'uuid'

export const usersEndpoint = '/api/users'

export const getIsValidUuid = (id: string) => validate(id)

export const getIfIdExist = (id: string) => {
    return !!userRepository.getUsers().find(user => user.id === id)
}

export const getIsUrlValid = (url: string) => {
    const arrUrl = url.split('/')
    const arrEndpoint = usersEndpoint.split('/')
    if (!url.startsWith(usersEndpoint)) return false
    if (arrUrl.length > 4 || arrUrl.length < 3) return false
    for (let i = 0; i < arrEndpoint.length - 1; i++) {
        if (arrEndpoint[i] !== arrUrl[i]) {
            return false
        }
    }
    return true
}

export const getIdFromUrl = (url: string) => {
    if (url === usersEndpoint) return null
    else return url.split('/')[3]
}

export const getIsPostBodyValid = body => {
    const { hobbies, username, age } = body
    return Object.keys(body).length === 3 
        && username && age && hobbies
        && typeof username === 'string'
        && typeof age === 'number'
        && Array.isArray(hobbies)
        && hobbies.every(hobbie => typeof hobbie === 'string')
}

export const getIsPutBodyValid = body => {
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
