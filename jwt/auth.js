import jwt from 'jsonwebtoken'
import UserDao from '../daos/mongo/user.dao.js'
const userDao = new UserDao()

const PRIVATE_KEY = '1234';

export const generateToken = (user) =>{
    const payload = {
        userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        cart: user.cart
    };

    const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: '15m'
    });
    console.log(token)
    return token
};

export const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        // req.get('Authorization')
        if(!authHeader) return res.status(401).json({ msg: 'Unauthorized' });
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, PRIVATE_KEY);
        const user = await userDao.getById(decode.userId);
        if(!user) return res.status(401).json({ msg: 'Unauthorized' });
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }

}