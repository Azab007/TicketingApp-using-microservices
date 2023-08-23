import express, {Request,Response} from 'express'
import { Ticket } from '../models/Ticket'
import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@azabticketing/common'
import { body } from 'express-validator'
const router = express.Router()

router.put('/api/tickets/:id',[
    body('title').not().isEmpty().withMessage("title shouldn't be empty"),
    body("price").isFloat({gt:0}).withMessage("price should be greater than 0")
], validateRequest,requireAuth,async (req: Request,res: Response) => {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        throw new NotFoundError()
    }
    if (ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }
    ticket.set({
        title: req.body.title,
        price: req.body.price
    })
    await ticket.save()
    res.send(ticket)
})
export {router as updateTicketRouter}