const INVALID_USERNAME_ERROR = 'Invalid username';

function validateUser(req, _, next) {
    const { body: { username } } = req;

    if (!username) {
        req.err = { message: INVALID_USERNAME_ERROR };
    }

    req.username = username;
    next();
}

exports.validateUser = validateUser;