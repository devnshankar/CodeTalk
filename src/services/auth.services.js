import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
const JWT_ACCESS_TOKEN_EXP = process.env.JWT_ACCESS_TOKEN_EXP

const JWT_REFRESH_TOKEN_EXP = process.env.JWT_REFRESH_TOKEN_EXP

class AuthService  {
    static verifyToken = (token) => {
        const verifiedToken = jwt.verify(token,JWT_SECRET)

        return verifiedToken
    }

    static decodeToken = (token) => {
        const decodedToken = jwt.decode(token,JWT_SECRET)

        return decodedToken
    } 

    static generateAcessToken = (id ) =>  {
        const accessToken = jwt.sign({id: id}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXP})

        return accessToken
    }

    static generateRefreshToken = (id) =>  {
        const refreshToken = jwt.sign({id: id}, JWT_SECRET, {expiresIn: JWT_REFRESH_TOKEN_EXP})

        return refreshToken
    }
}

export default AuthService