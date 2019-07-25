function prepareErrorPayload(message, status = 400) {
    return {
        message,
        status
    };
}

exports.prepareErrorPayload = prepareErrorPayload;