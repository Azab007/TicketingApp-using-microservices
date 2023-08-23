import express,{Request,Response} from 'express'
import {body,validationResult} from 'express-validator'
import {User} from '../models/User'
import jwt from 'jsonwebtoken'
import { BadRequestError ,validateRequest,RequestValidationError} from '@azabticketing/common'
const router = express.Router()

router.post('/api/users/signup',[
    body('email').isEmail().withMessage("email must be valid"),
    body('password').trim().isLength({min:4,max:20}).withMessage("password must be between 4 and 20 characters")
],
validateRequest
,
async (req: Request,res: Response) => {
    const {email,password} = req.body
    const existingUser = await User.findOne({email:email})
    if (existingUser) {
        throw new BadRequestError("email in use")
    }
    const user = User.build({
        email:email,
        password: password
    })
    await user.save()
    const token = jwt.sign({
        id: user.id,
        email:user.email
    },process.env.JWT_KEY!)

    req.session = {
        jwt: token
    }
    res.status(201).send(user)

})

export {router as signupRouter}