import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
            throw new Error('token is not present');
        }
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        if(decoded.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        next()
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });        
    }
};