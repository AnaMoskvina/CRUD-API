require('dotenv').config()
import http from  'http'
import { userRepository } from './userRepository'
import { 
    getIsValidUuid, 
    getIfIdExist, 
    getIsPostBodyValid, 
    getIsPutBodyValid,
    getIdFromUrl,
    getIsUrlValid
 } from './utils'

const port = process.env.PORT

// Inital data in DB
userRepository.postUser({
    username: 'user',
    age: 30,
    hobbies: []
})
userRepository.postUser({
    username: 'user1',
    age: 33,
    hobbies: ['coding']
})


const requestListener = function (req, res) {
    const { url: path, method } = req
    const id = getIdFromUrl(path)

    if (!getIsUrlValid(path)) {
        res.writeHead(404)
        res.write('Invalid endpoint')
        res.end()
        return
    }
    
    const respondWithIdCheck = (id: string, handleSuccess: Function): void => {
        if (!getIsValidUuid(id)) {
            res.writeHead(400)
            res.write('Invalid format of id')
            res.end()
        } else if (!getIfIdExist(id)) {
            res.writeHead(404)
            res.write(`User with id ${id} does not exist`)
            res.end()
        } else {
            handleSuccess()
        }
    }

    if (method === 'GET') {
        if (!id) {
            res.writeHead(200)
            res.write(JSON.stringify(userRepository.getUsers()))
            res.end()
        } else {
            const handleSuccess = () => {
                res.writeHead(200)
                res.write(JSON.stringify(userRepository.getUser(id)))
                res.end()
            }
            respondWithIdCheck(id, handleSuccess)
        }
    }

    if (method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => { 
            const bodyObj = JSON.parse(body.toString())
            if (!getIsPostBodyValid(bodyObj)) {
                res.writeHead(400)
                res.write('Body should contain username (string), age (number) and hobbies (empty array or array of strings)')
                res.end()
            } else {
                const createdUser = userRepository.postUser(bodyObj)
                res.setHeader('Content-Type', 'application/json')
                res.writeHead(201)
                res.write(JSON.stringify(createdUser))
                res.end()
            }
        })
    }

    if (method === 'PUT') {
        const handleSuccess = () => {
            const body = []
            req.on('data', chunk => {
                body.push(chunk)
            }).on('end', () => { 
                const bodyObj = JSON.parse(body.toString())
                if (!getIsPutBodyValid(bodyObj)) {
                    res.writeHead(400)
                    res.write('Body type is invalid')
                    res.end()
                } else {
                    const updatedUser = db.putUser(id, bodyObj)
                    res.setHeader("Content-Type", "application/json")
                    res.writeHead(200)
                    res.write(JSON.stringify(updatedUser))
                    res.end()
                }
            })
        }
        respondWithIdCheck(id, handleSuccess)
    }

    if (method === 'DELETE') {
        const handleSuccess = () => {
            userRepository.deleteUser(id)
            res.writeHead(204)
            res.end()
        }
        respondWithIdCheck(id, handleSuccess)
    }

}

const server = http.createServer(requestListener)
server.listen(port)
