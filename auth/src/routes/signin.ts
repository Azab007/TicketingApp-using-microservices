import express, {Request,Response} from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { Password } from '../services/password'
import { BadRequestError } from '@azabticketing/common'
const router = express.Router()

router.post('/api/users/signin',[
    body('email').isEmail().withMessage("email must be valid"),
    body('password').trim().notEmpty().withMessage("password must not be empty")
] ,async(req: Request,res:Response) => {
    const {email,password} = req.body
    const existingUser = await User.findOne({email})
    if (!existingUser){
        throw new BadRequestError("Invalid Credentials")
    }
    const passwordMatched = await Password.compare(existingUser.password,password)
    if (!passwordMatched) {
        throw new BadRequestError("Invalid Credentials")   
    }
    const token = jwt.sign({
        id: existingUser.id,
        email:existingUser.email
    },process.env.JWT_KEY!)

    req.session = {
        jwt: token
    }
    res.status(200).send(existingUser)
})

export {router as signinRouter}