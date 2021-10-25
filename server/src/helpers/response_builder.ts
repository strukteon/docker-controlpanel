export function buildSuccessResponse(data: Object) {
    return {
        success: true,
        data
    }
}

export function buildErrorResponse(errorMessage: string, errorKey: string = 'ERR') {
    return {
        success: false,
        error_msg: errorMessage,
        error_key: errorKey
    }
}