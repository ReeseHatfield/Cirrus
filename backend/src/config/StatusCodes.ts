/**
 *  Collection of HTTP Status Codes
 *  Only used status codes are included
 *  This is mostly just here to limit bundle
 *  and node_modules size, as the libraries for
 *  HTTP codes are larger than they should be
 */
const StatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export default StatusCodes;