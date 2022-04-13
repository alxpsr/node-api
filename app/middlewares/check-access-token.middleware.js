import jwt from 'jsonwebtoken';

export function checkAccessTokenMiddleware(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(403).send('Invalid Access Token');
    }

    next();
}
