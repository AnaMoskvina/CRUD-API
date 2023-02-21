export const enum STATUS_CODES {
    SUCCESS = 200,
    CREATED = 201,
    DELETED = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}

export const enum ERROR_MESSAGES {
    INVALID_BODY = 'Invalid body type',
    SERVER_ERROR = 'Error on server side',
    NOT_FOUND = 'User is not found',
    INVALID_ID = 'Id is invalid',
    INVALID_URL = 'Invalid request url'
}

export const BASE_URL = '/api/users'

export class NotFoundError extends Error {}
export class ValidationError extends Error {}