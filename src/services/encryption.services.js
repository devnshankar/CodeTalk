import { createHmac } from 'node:crypto'
import dotenv from 'dotenv'

dotenv.config();

const PASSWORD_SECRET = process.env.PASSWORD_SECRET

class Encryption {
    static hashPassword = (password) => {
        const hash = createHmac('sha256', PASSWORD_SECRET)
        hash.update(password);

        return hash.digest('hex')
    }

    static verifyPassword = (fetchedPassword, savedPassword) => {
        const hashedPassword = this.hashPassword(fetchedPassword)
        if(hashedPassword === savedPassword) {
            return true
        }
        else{
            return false
        }
    }


}

export default Encryption