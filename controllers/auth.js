const jwt = require('jsonwebtoken');

/**
 * @method POST
 * @route /api/login
 * @Authorization None
 */
exports.login = (req, res) => {
    const { username, password } = req.body;

    // check if username and password exists
    if (!username || !password) return res.json({
        message: 'Username or password invalid!'
    });

    // *********************
    const token = jwt.sign({ username }, 'SECRET');

    return res.status(200).json({
        message: 'Logged in successfully!',
        token
    });
}

// token verify middleware
exports.isAuth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({
        message: 'Access Denied!'
    });

    try {
        const { username } = jwt.verify(token, 'SECRET');
        req.username = username;
    } catch (err) {
        return res.status(400).json({
            message: 'Invalid token'
        });
    }

    next();
}