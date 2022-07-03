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
    NOT_EXISTS = 'User does not exist'
}