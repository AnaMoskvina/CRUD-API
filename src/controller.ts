import { BASE_URL, ERROR_MESSAGES, STATUS_CODES } from './constants'
import { service } from './service'
import { ValidationError, NotFoundError } from './constants'

const getIdFromUrl = (url: string) => {
    if (url === BASE_URL) return null
    else return url.split('/')[3]
}

const getIsUrlValid = (url: string) => {
    const arrUrl = url.split('/')
    const arrEndpoint = BASE_URL.split('/')
    if (!url.startsWith(BASE_URL)) return false
    if (arrUrl.length > 4 || arrUrl.length < 3) return false
    for (let i = 0; i < arrEndpoint.length - 1; i++) {
        if (arrEndpoint[i] !== arrUrl[i]) {
            return false
        }
    }
    return true
}

export const controller = async (req, res) => {
    try {
        const { url, method } = req
        if (!getIsUrlValid(url)) {
            throw new ValidationError(ERROR_MESSAGES.INVALID_URL)
        }
        const id = getIdFromUrl(url) || ''
    
        switch (method) {
            case 'GET': 
                const getResBody = await service.get(id)
                res.writeHead(STATUS_CODES.SUCCESS)
                res.write(JSON.stringify(getResBody))
                res.end()
                break;
            case 'POST': 
                const postBody: string[] = []
                req.on('data', chunk => {
                    postBody.push(chunk);
                }).on('end', async () => { 
                    const bodyObj = JSON.parse(postBody.toString())
                    const resBodyPost = await service.post(bodyObj)
                    res.setHeader('Content-Type', 'application/json')
                    res.writeHead(STATUS_CODES.CREATED)
                    res.write(JSON.stringify(resBodyPost))
                    res.end()
                })
                break;
            case 'PUT':
                const putBody: string[] = []
                req.on('data', chunk => {
                    putBody.push(chunk)
                }).on('end', async () => { 
                    const bodyObj = JSON.parse(putBody.toString())
                    const resBodyPut = await service.put(id, bodyObj)
                    res.setHeader('Content-Type', 'application/json')
                    res.writeHead(STATUS_CODES.SUCCESS)
                    res.write(JSON.stringify(resBodyPut))
                    res.end()
                })
                break;
            case 'DELETE':
                await service.delete(id)
                res.writeHead(STATUS_CODES.DELETED)
                res.end()
                break;
            default:
                throw new NotFoundError(ERROR_MESSAGES.INVALID_URL)
        }
    } catch(err) {
        if (err instanceof ValidationError) {
            res.writeHead(STATUS_CODES.BAD_REQUEST)
        } else if (err instanceof NotFoundError) {
            res.writeHead(STATUS_CODES.NOT_FOUND)
        } else {
            res.writeHead(STATUS_CODES.SERVER_ERROR)
        }
        res.write(err.message)
        res.end()
    }
}