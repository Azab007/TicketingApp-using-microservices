import express, {Request,Response} from 'express'
import { Order } from '../models/Order'
import { NotAuthorizedError, NotFoundError } from '@azabticketing/common'
const router = express.Router()

router.get('/api/orders/:orderId',async (req: Request,res: Response) => {
    const order = await Order.findById(req.params.orderId)
    if (!order) {
        throw new NotFoundError()
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }
    res.send(order)
})
export {router as showOrderRouter}