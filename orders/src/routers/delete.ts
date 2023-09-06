import { NotAuthorizedError, NotFoundError, OrderStatus } from '@azabticketing/common'
import express, {Request,Response} from 'express'
import { Order } from '../models/Order'
import { OrderCancelledPublisher } from '../events/publisherss/order-cancelled-publisher'
import { natsWrapper } from '../nats-wrapper'
const router = express.Router()

router.delete('/api/orders/:orderId',async (req: Request,res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket')
    if (!order) {
        throw new NotFoundError()
    }
    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }
    order.status = OrderStatus.Cancelled
    await order.save()
    new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        ticket:{
            id: order.ticket.id
        }
    })

})
export {router as deleteOrderRouter}